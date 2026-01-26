import { ComponentProps, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Exercise, Maxes } from '@/types/training';


export default function Maxes({ maxes, updateMaxes, exercises, ...props }: ComponentProps<"div"> & { maxes: Maxes, updateMaxes: (maxes: Maxes) => void, exercises: Exercise[] }) {
    const [localMaxes, setLocalMaxes] = useState(() => maxes);

    const submit = () => updateMaxes(localMaxes);
    const primaryExercises = exercises.filter((exercise) => exercise.isPrimary);

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>One Rep Maxes</CardTitle>
                <CardDescription>
                    Enter your current maxes to calculate training
                    weights.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {primaryExercises.map((exercise) => (
                        <div key={exercise.slug} className="grid gap-2">
                            <Label htmlFor={exercise.slug}>{exercise.label} (kg)</Label>
                            <Input
                                id={exercise.slug}
                                type="number"
                                value={localMaxes[exercise.slug] ?? 0}
                                onChange={(e) =>
                                    setLocalMaxes({
                                        ...localMaxes,
                                        [exercise.slug]: parseFloat(e.target.value) || 0,
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
