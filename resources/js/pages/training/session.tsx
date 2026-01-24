import { Form, Head, router } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import MaxesComponent from '@/components/training/maxes';
import { Timer } from '@/components/training/timer';
import { WorkoutSchema, type Schema } from '@/components/training/workout-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Maxes, Program } from '@/types/training';
import training from '@/wayfinder/routes/training';

export default function Session({ program, schema, maxes }: {
    program: Program
    schema: Schema
    maxes: Maxes
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: program.name, href: '' },
        { title: 'Session', href: '' },
    ];

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('day', String(schema.day));
    searchParams.set('week', String(schema.week));

    const updateMaxes = (maxes: Maxes) => {
        for (const key of Object.keys(maxes)) {
            searchParams.set(key, maxes[key].toString());
        }

        router.reload({
            data: Object.fromEntries(searchParams.entries())
        });
    };

    const [completedSets, setCompletedSets] = useState<string[]>([]);
    const durationRef = useRef(0);

    const handleSetChange = useCallback((key: string) => {
        setCompletedSets(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    }, []);

    const handleTick = useCallback((seconds: number) => {
        durationRef.current = seconds;
    }, []);

    const buildSets = useCallback(() => {
        // Transform completedSets keys into actual set data
        // Key format: "blockIndex-liftIndex-setIndex"
        return completedSets.map(key => {
            const [blockIndex, liftIndex] = key.split('-').map(Number);
            const block = schema.blocks[blockIndex];
            const lift = block.lifts[liftIndex];
            return {
                exercise: block.exercise,
                weight: lift.weight,
                reps: lift.reps,
            };
        });
    }, [completedSets, schema.blocks]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Training - ${program.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full relative">
                {/* Floating Timer / Header on mobile? For now just static top */}
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 -mx-4 px-4 border-b flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold">{program.name}</h2>
                        <p className="text-sm text-muted-foreground">Week {schema.week} Day {schema.day}</p>
                    </div>
                    <Timer onTick={handleTick} />
                </div>

                <MaxesComponent maxes={maxes} updateMaxes={updateMaxes} />

                <Form
                    {...training.store.form(program.slug)}
                    transform={(data) => ({
                        ...data,
                        program_name: program.slug,
                        week: schema.week,
                        day: schema.day,
                        duration_seconds: durationRef.current,
                        sets: buildSets(),
                    })}
                    className="space-y-6 pb-20"
                >
                    {({ errors, processing }) => (
                        <>
                            <InputError message={errors.program_name} />
                            <Card>
                                <CardContent className="pt-6">
                                    <WorkoutSchema
                                        schema={schema}
                                        completedSets={completedSets}
                                        onSetChange={handleSetChange}
                                    />
                                </CardContent>
                            </Card>

                            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex justify-center md:static md:bg-transparent md:border-none md:p-0 md:justify-end">
                                <Button type="submit" size="lg" disabled={processing} className="w-full md:w-auto shadow-lg">
                                    <Save className="mr-2 h-4 w-4" />
                                    Complete Workout
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
