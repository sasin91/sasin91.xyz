import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WorkoutSchema, type Schema, type Block } from '@/components/training/workout-schema';
import { Timer } from '@/components/training/timer';
import { BreadcrumbItem } from '@/types';
import { Separator } from '@/components/ui/separator';

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

    const { data, setData, post, processing, errors } = useForm({
        program_name: program.name,
        day: schema.day,
        week: schema.week,
        content: schema.blocks, // Initial state, currently assuming full completion implies saving this structure. 
        // Ideally we map completions, but for MVP saving the schema structure is redundant but acceptable as 'snapshot'.
        // A real app would track actual inputs (reps/weight performed). 
        // We'll just save the 'prescribed' content for now as the 'content' json.
        duration_seconds: 0
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(training.store.url('sheiko-29'));
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
                    <Timer />
                </div>

                <form onSubmit={submit} className="space-y-6 pb-20">
                    <Card>
                        <CardContent className="pt-6">
                            <WorkoutSchema
                                schema={schema}
                            // In a real app we'd bind state here to `data.content` to track actuals
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
