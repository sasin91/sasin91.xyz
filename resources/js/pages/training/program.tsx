import { Head, Link, router, usePage } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useState } from 'react';

import MaxesComponent from '@/components/training/maxes';
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
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Maxes, Program } from '@/types/training';
import { login } from '@/wayfinder/routes';
import training from '@/wayfinder/routes/training';

export default function Program({
    program,
    maxes,
    schemas,
    nextDay,
    nextWeek,
    programComplete,
}: {
    program: Program
    maxes: Maxes
    schemas: Schema[]
    nextDay: number
    nextWeek: number
    programComplete: boolean
}) {
    const { auth } = usePage().props;
    const [showRestartDialog, setShowRestartDialog] = useState(() => programComplete);

    const handleConfirmRestart = () => {
        setShowRestartDialog(false);
    };

    const handleCancelRestart = () => {
        router.visit(training.index.url());
    };

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('day', String(nextDay));
    searchParams.set('week', String(nextWeek));

    const data = Object.fromEntries(searchParams.entries());

    const updateMaxes = (maxes: Maxes) => {
        for (const key of Object.keys(maxes)) {
            searchParams.set(key, maxes[key].toString());
        }

        router.reload({
            data: Object.fromEntries(searchParams.entries()),
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

                <MaxesComponent maxes={maxes} updateMaxes={updateMaxes} />

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
                                <WorkoutSchema schema={schemas[0]} />
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
