import { Head, Link, router } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import MaxesComponent from '@/components/training/maxes';
import RestartProgramDialog from '@/components/training/restart-program-dialog';
import {
    type Schema,
    WorkoutSchema,
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import type { Exercise, Maxes, Program } from '@/types/training';
import training from '@/wayfinder/routes/training';

export default function Program({
    program,
    maxes,
    exercises,
    schemas,
    nextDay,
    nextWeek,
    programComplete,
}: {
    program: Program;
    exercises: Exercise[];
    maxes: Maxes;
    schemas: Schema[];
    nextDay: number;
    nextWeek: number;
    programComplete: boolean;
}) {
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

    function SchemaPreview({ schema, isActive }: { schema: Schema; isActive: boolean }) {
        const [open, setOpen] = useState(isActive);
        const collapsibleRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            if (isActive && collapsibleRef.current) {
                const raf = requestAnimationFrame(() => {
                    collapsibleRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                })

                return () => {
                    cancelAnimationFrame(raf)
                }
            }
        }, [isActive]);
        return (
            <Collapsible ref={collapsibleRef} open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start p-4 h-auto text-lg font-semibold">
                        Week {schema.week} — Day {schema.day}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-4 pt-0">
                    <WorkoutSchema schema={schema} />
                </CollapsibleContent>
            </Collapsible>
        );
    }


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

                <MaxesComponent
                    exercises={exercises}
                    maxes={maxes}
                    updateMaxes={updateMaxes}
                />

                <div className="flex justify-end">
                    <Button asChild size="lg" className="w-full md:w-auto">
                        <Link
                            href={training.session.url(program.key, {
                                query: data,
                            })}
                        >
                            <Play className="mr-2 h-4 w-4" /> Start Training
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Program Preview</CardTitle>
                            <CardDescription>{program.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {schemas.map((schema) => (
                                    <SchemaPreview
                                        key={`week-${schema.week}-day-${schema.day}`}
                                        schema={schema}
                                        isActive={schema.week === nextWeek && schema.day === nextDay}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <RestartProgramDialog programCompleted={programComplete} />
        </AppLayout>
    );
}
