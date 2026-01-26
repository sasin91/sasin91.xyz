import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Dumbbell } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Underline } from '@/components/ui/underline';
import AppLayout from '@/layouts/app-layout';

interface ProgramSummary {
    slug: string;
    name: string;
    type: string;
    days: number;
    weeks: number;
}

export default function Index({ programs }: { programs: ProgramSummary[] }) {
    const searchParams = new URLSearchParams(window.location.search);

    return (
        <AppLayout>
            <Head title="Training Programs" />

            <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6 p-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Training Programs
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Select a program to start planning your training cycle.
                    </p>
                </div>

                <ul
                    role="list"
                    className="divide-y divide-border/60 rounded-lg border border-border/60"
                >
                    {programs.map((program) => (
                        <li key={program.slug}>
                            <Link
                                href={`/training/${program.slug}?${searchParams.toString()}`}
                                className="group flex items-center justify-between gap-4 p-4 hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                        <Dumbbell className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            <Underline>
                                                {program.name}
                                            </Underline>
                                        </p>
                                        <p className="mt-1 truncate text-xs text-muted-foreground">
                                            {program.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                    <Badge variant="secondary">
                                        {program.days} days / {program.weeks}{' '}
                                        weeks
                                    </Badge>
                                    <ChevronRight
                                        className="h-4 w-4 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
