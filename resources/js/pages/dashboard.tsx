import { Head } from '@inertiajs/react';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { dashboard } from '@/wayfinder/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ workouts = [] }: { workouts?: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center gap-2">
                        <h3 className="text-muted-foreground font-medium">Recent Activity</h3>
                        <div className="text-2xl font-bold">{workouts.length} Workouts</div>
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Training History</h2>
                        {workouts.length === 0 ? (
                            <p className="text-muted-foreground">No workouts completed yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-muted-foreground border-b">
                                        <tr>
                                            <th className="py-3 px-4 font-medium">Date</th>
                                            <th className="py-3 px-4 font-medium">Program</th>
                                            <th className="py-3 px-4 font-medium">Session</th>
                                            <th className="py-3 px-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workouts.map((workout: any) => (
                                            <tr key={workout.id} className="border-b last:border-0 hover:bg-muted/50">
                                                <td className="py-3 px-4">{new Date(workout.completed_at).toLocaleDateString()}</td>
                                                <td className="py-3 px-4 font-medium">{workout.program_name}</td>
                                                <td className="py-3 px-4">Week {workout.week} Day {workout.day}</td>
                                                <td className="py-3 px-4 text-green-600 font-medium">Completed</td>
                                            </tr>
                                        ))}
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
