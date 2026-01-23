import { Head, router } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler, useCallback, useRef, useState } from 'react';

import { Timer } from '@/components/training/timer';
import { WorkoutSchema, type Schema } from '@/components/training/workout-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import training from '@/wayfinder/routes/training';

interface Program {
    name: string;
}

interface SessionProps {
    program: Program;
    schema: Schema;
}

export default function Session({ program, schema }: SessionProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: 'Session', href: '' },
    ];

    const [completedSets, setCompletedSets] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const durationRef = useRef(0);

    const handleSetToggle = useCallback((key: string) => {
        setCompletedSets(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    }, []);

    const handleTick = useCallback((seconds: number) => {
        durationRef.current = seconds;
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Transform completedSets keys into actual set data
        // Key format: "blockIndex-liftIndex-setIndex"
        const sets = completedSets.map(key => {
            const [blockIndex, liftIndex] = key.split('-').map(Number);
            const block = schema.blocks[blockIndex];
            const lift = block.lifts[liftIndex];
            return {
                exercise: block.exercise,
                weight: lift.weight,
                reps: lift.reps,
            };
        });

        setProcessing(true);
        router.post(training.store.url('sheiko-29'), {
            program_name: program.name,
            week: schema.week,
            day: schema.day,
            duration_seconds: durationRef.current,
            sets,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

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

                <form onSubmit={submit} className="space-y-6 pb-20">
                    <Card>
                        <CardContent className="pt-6">
                            <WorkoutSchema
                                schema={schema}
                                completedSets={completedSets}
                                onSetToggle={handleSetToggle}
                            />
                        </CardContent>
                    </Card>

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex justify-center md:static md:bg-transparent md:border-none md:p-0 md:justify-end">
                        <Button type="submit" size="lg" disabled={processing} className="w-full md:w-auto shadow-lg">
                            <Save className="mr-2 h-4 w-4" />
                            Complete Workout
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
