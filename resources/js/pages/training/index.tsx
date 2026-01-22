import { Head, Link } from '@inertiajs/react';
import { Dumbbell, ChevronRight } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProgramSummary {
    slug: string;
    name: string;
    type: string;
    duration: any;
}

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

                <div className="flex flex-wrap justify-center gap-4 w-full">
                    {programs.map((program) => (
                        <Card key={program.slug} className="hover:border-primary/50 transition-colors w-full max-w-sm">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{program.name}</CardTitle>
                                        <CardDescription className="mt-1">{program.type}</CardDescription>
                                    </div>
                                    <Dumbbell className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mt-2">
                                    <Badge variant="secondary">
                                        4 Weeks
                                    </Badge>
                                    <Button asChild variant="ghost" size="sm" className="-mr-2">
                                        <Link href={`/training/sheiko-29`}>
                                            View Program <ChevronRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
