import { Form, Head, router } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useCallback, useRef } from 'react';

import InputError from '@/components/input-error';
import MaxesComponent from '@/components/training/maxes';
import { Timer } from '@/components/training/timer';
import {
    type Schema,
    WorkoutSchema,
} from '@/components/training/workout-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Exercise, Maxes, Program } from '@/types/training';
import training from '@/wayfinder/routes/training';

export default function Session({
    program,
    schema,
    maxes,
    exercises
}: {
    program: Program;
    schema: Schema;
    maxes: Maxes;
    exercises: Exercise[];
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
            data: Object.fromEntries(searchParams.entries()),
        });
    };

    const durationRef = useRef(0);

    const handleTick = useCallback((seconds: number) => {
        durationRef.current = seconds;
    }, []);

    const buildSets = useCallback(() => {
        // Build all sets from the schema
        const sets: { exercise: string; weight: number; reps: number }[] = [];
        schema.blocks.forEach((block) => {
            block.lifts.forEach((lift) => {
                for (let i = 0; i < lift.sets; i++) {
                    sets.push({
                        exercise: block.exercise,
                        weight: lift.weight,
                        reps: lift.reps,
                    });
                }
            });
        });
        return sets;
    }, [schema.blocks]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Training - ${program.name}`} />

            <div className="relative mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-6 p-4">
                {/* Floating Timer / Header on mobile? For now just static top */}
                <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b bg-background/95 px-4 py-4 backdrop-blur">
                    <div>
                        <h2 className="font-semibold">{program.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            Week {schema.week} Day {schema.day}
                        </p>
                    </div>
                    <Timer onTick={handleTick} />
                </div>

                <MaxesComponent exercises={exercises} maxes={maxes} updateMaxes={updateMaxes} />

                <Form
                    {...training.store.form(program.key)}
                    transform={(data) => ({
                        ...data,
                        program: program.key,
                        week: schema.week,
                        day: schema.day,
                        duration_seconds: durationRef.current,
                        sets: buildSets(),
                    })}
                    className="space-y-6 pb-20"
                >
                    {({ errors, processing }) => (
                        <>
                            <InputError message={errors.program} />
                            <Card>
                                <CardContent className="pt-6">
                                    <WorkoutSchema schema={schema} />
                                </CardContent>
                            </Card>

                            <div className="fixed right-0 bottom-0 left-0 flex justify-center border-t bg-background p-4 md:static md:justify-end md:border-none md:bg-transparent md:p-0">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={processing}
                                    className="w-full shadow-lg md:w-auto"
                                >
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
