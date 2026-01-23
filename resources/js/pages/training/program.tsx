import { Head, Link, router, usePage } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    WorkoutSchema,
    type Schema,
} from '@/components/training/workout-schema';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { login } from '@/wayfinder/routes';
import training from '@/wayfinder/routes/training';

// Simplified types matching the PHP structure
interface Program {
    name: string;
    type: string;
    days: number;
    weeks: number;
}

interface Maxes {
    squat: number;
    bench: number;
    deadlift: number;
}

export default function Program({
    program,
    maxes,
    schemas,
    nextDay,
    nextWeek,
    programComplete,
}: {
    program: Program;
    maxes: Maxes;
    schemas: Schema[];
    nextDay: number;
    nextWeek: number;
    programComplete: boolean;
}) {
    const { auth } = usePage().props;
    const [showRestartDialog, setShowRestartDialog] = useState(false);

    useEffect(() => {
        if (programComplete) {
            setShowRestartDialog(true);
        }
    }, [programComplete]);

    const handleConfirmRestart = () => {
        setShowRestartDialog(false);
    };

    const handleCancelRestart = () => {
        router.visit(training.index.url());
    };

    // Local state for inputs to allow typing
    const [localMaxes, setLocalMaxes] = useState(() => maxes);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('squat', localMaxes.squat.toString());
    searchParams.set('bench', localMaxes.bench.toString());
    searchParams.set('deadlift', localMaxes.deadlift.toString());
    searchParams.set('day', String(nextDay));
    searchParams.set('week', String(nextWeek));

    const data = Object.fromEntries(searchParams.entries());

    const updateMaxes = () => {
        router.reload({
            data,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: program.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={program.name} />

            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {program.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {program.type} • {schemas.length} Workouts
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>One Rep Maxes</CardTitle>
                        <CardDescription>
                            Enter your current maxes to calculate training
                            weights.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="squat">Squat (kg)</Label>
                                <Input
                                    id="squat"
                                    type="number"
                                    value={localMaxes.squat}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            squat:
                                                parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bench">Bench Press (kg)</Label>
                                <Input
                                    id="bench"
                                    type="number"
                                    value={localMaxes.bench}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            bench:
                                                parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deadlift">Deadlift (kg)</Label>
                                <Input
                                    id="deadlift"
                                    type="number"
                                    value={localMaxes.deadlift}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            deadlift:
                                                parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    {auth?.user ? (
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <Link
                                href={training.session.url(program.slug, {
                                    query: data,
                                })}
                            >
                                <Play className="mr-2 h-4 w-4" /> Start Training
                            </Link>
                        </Button>
                    ) : (
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <Link href={login()}>Login to start workout</Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Program Preview</CardTitle>
                            <CardDescription>{program.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schemas.length > 0 && (
                                <WorkoutSchema schema={schemas[0]} readOnly />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog
                open={showRestartDialog}
                onOpenChange={(open) => {
                    if (!open) handleCancelRestart();
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Program Completed</DialogTitle>
                        <DialogDescription>
                            You have already completed this program. Do you want
                            to restart it?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={handleCancelRestart}
                        >
                            No, go back
                        </Button>
                        <Button onClick={handleConfirmRestart}>
                            Yes, restart
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
