import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Maxes } from "@/types/training";

const exerciseLabels: Record<string, string> = {
    squat: 'Squat',
    bench: 'Bench Press',
    deadlift: 'Deadlift',
};

function formatLabel(slug: string): string {
    return exerciseLabels[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function Maxes({ maxes, updateMaxes }: { maxes: Maxes, updateMaxes: (maxes: Maxes) => void }) {
    const [localMaxes, setLocalMaxes] = useState(() => maxes);

    const submit = () => updateMaxes(localMaxes);

    const exercises = Object.keys(maxes);

    return (
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
                    {exercises.map((exercise) => (
                        <div key={exercise} className="grid gap-2">
                            <Label htmlFor={exercise}>{formatLabel(exercise)} (kg)</Label>
                            <Input
                                id={exercise}
                                type="number"
                                value={localMaxes[exercise] ?? 0}
                                onChange={(e) =>
                                    setLocalMaxes({
                                        ...localMaxes,
                                        [exercise]: parseFloat(e.target.value) || 0,
                                    })
                                }
                                onBlur={submit}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
