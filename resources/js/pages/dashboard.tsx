import { Head, Link } from '@inertiajs/react';
import { Play } from 'lucide-react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { dashboard } from '@/wayfinder/routes';
import { App } from '@/wayfinder/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    workouts,
    startTrainingUrl,
}: {
    workouts: App.Models.Workout[];
    startTrainingUrl: string;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 text-center dark:border-sidebar-border">
                        <h3 className="font-medium text-muted-foreground">
                            Next Workout
                        </h3>
                        <Button asChild size="sm" className="mt-2">
                            <Link href={startTrainingUrl}>
                                <Play className="mr-2 h-4 w-4" /> Start Session
                            </Link>
                        </Button>
                    </div>
                    <div className="relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h3 className="font-medium text-muted-foreground">
                            Recent Activity
                        </h3>
                        <div className="text-2xl font-bold">
                            {workouts.length} Workouts
                        </div>
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Training History
                        </h2>
                        {workouts.length === 0 ? (
                            <p className="text-muted-foreground">
                                No workouts completed yet.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Program
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Session
                                            </th>
                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workouts.map(
                                            (workout: App.Models.Workout) => (
                                                <tr
                                                    key={workout.id}
                                                    className="border-b last:border-0 hover:bg-muted/50"
                                                >
                                                    <td className="px-4 py-3">
                                                        {workout.completed_at
                                                            ? new Date(
                                                                  workout.completed_at,
                                                              ).toLocaleDateString()
                                                            : 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium">
                                                        {workout.program_name}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        Week {workout.week} Day{' '}
                                                        {workout.day}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-green-600">
                                                        Completed
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
