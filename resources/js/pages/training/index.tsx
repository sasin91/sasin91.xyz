import { Head, Link } from '@inertiajs/react';
import { Dumbbell, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Underline } from '@/components/ui/underline';
import AppLayout from '@/layouts/app-layout';

interface ProgramSummary {
    slug: string;
    name: string;
    type: string;
    duration: number;
}

const WEEK_SECONDS = 7 * 24 * 60 * 60;
const DAY_SECONDS = 24 * 60 * 60;
const HOUR_SECONDS = 60 * 60;

const formatDuration = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) {
        return 'Duration unknown';
    }

    if (seconds >= WEEK_SECONDS) {
        const weeks = Math.round(seconds / WEEK_SECONDS);
        return `${weeks} Week${weeks === 1 ? '' : 's'}`;
    }

    if (seconds >= DAY_SECONDS) {
        const days = Math.round(seconds / DAY_SECONDS);
        return `${days} Day${days === 1 ? '' : 's'}`;
    }

    const hours = Math.max(1, Math.round(seconds / HOUR_SECONDS));
    return `${hours} Hour${hours === 1 ? '' : 's'}`;
};

export default function Index({ programs }: { programs: ProgramSummary[] }) {
    return (
        <AppLayout>
            <Head title="Training Programs" />

            <div className="mt-10 flex flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Training Programs</h1>
                    <p className="text-muted-foreground mt-2">
                        Select a program to start planning your training cycle.
                    </p>
                </div>

                <ul role="list" className="divide-y divide-border/60 rounded-lg border border-border/60">
                    {programs.map((program) => (
                        <li key={program.slug}>
                            <Link
                                href={`/training/${program.slug}`}
                                className="group flex items-center justify-between gap-4 p-4 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                        <Dumbbell className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            <Underline>{program.name}</Underline>
                                        </p>
                                        <p className="mt-1 truncate text-xs text-muted-foreground">{program.type}</p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                    <Badge variant="secondary">{formatDuration(program.duration)}</Badge>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
