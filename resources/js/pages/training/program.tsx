import { Head, Link, usePage, router } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkoutSchema, type Schema } from '@/components/training/workout-schema';
import { BreadcrumbItem } from '@/types';

import training from '@/wayfinder/routes/training';

// Simplified types matching the PHP structure
interface Program {
    name: string;
    type: string;
    duration: any;
}

interface Maxes {
    squat: number;
    bench: number;
    deadlift: number;
}

export default function Program({ program, maxes, schemas }: { program: Program; maxes: Maxes; schemas: Schema[] }) {
    const { auth } = usePage().props;

    // Local state for inputs to allow typing
    const [localMaxes, setLocalMaxes] = useState(maxes);

    // Update local state if props change (e.g. initial load or external update)
    useEffect(() => {
        setLocalMaxes(maxes);
    }, [maxes]);

    const updateMaxes = () => {
        router.get(
            // Reconstruct current URL to keep the program slug
            window.location.pathname,
            { ...localMaxes },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true
            }
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: program.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={program.name} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
                        <p className="text-muted-foreground">
                            {program.type} • {schemas.length} Workouts
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>One Rep Maxes</CardTitle>
                        <CardDescription>Enter your current maxes to calculate training weights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="squat">Squat (kg)</Label>
                                <Input
                                    id="squat"
                                    type="number"
                                    value={localMaxes.squat}
                                    onChange={e => setLocalMaxes({ ...localMaxes, squat: parseFloat(e.target.value) || 0 })}
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bench">Bench Press (kg)</Label>
                                <Input
                                    id="bench"
                                    type="number"
                                    value={localMaxes.bench}
                                    onChange={e => setLocalMaxes({ ...localMaxes, bench: parseFloat(e.target.value) || 0 })}
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deadlift">Deadlift (kg)</Label>
                                <Input
                                    id="deadlift"
                                    type="number"
                                    value={localMaxes.deadlift}
                                    onChange={e => setLocalMaxes({ ...localMaxes, deadlift: parseFloat(e.target.value) || 0 })}
                                    onBlur={updateMaxes}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    {/* @ts-ignore */}
                    {auth.user && (
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <Link href={training.session.url('sheiko-29')}>
                                <Play className="mr-2 h-4 w-4" /> Start Training
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Program Preview</CardTitle>
                            <CardDescription>Sample workout structure (Day 1 Week 1)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schemas.length > 0 && (
                                <WorkoutSchema schema={schemas[0]} readOnly />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
