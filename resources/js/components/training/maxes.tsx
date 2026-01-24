import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Maxes } from "@/types/training";

export default function Maxes({ maxes, updateMaxes }: { maxes: Maxes, updateMaxes: (maxes: Maxes) => void }) {
    const [localMaxes, setLocalMaxes] = useState(() => maxes);

    const submit = () => updateMaxes(localMaxes);

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
                    <div className="grid gap-2">
                        {}
                        <Label htmlFor="squat">Squat (kg)</Label>
                        <Input
                            id="squat"
                            type="number"
                            value={localMaxes.squat}
                            onChange={(e) =>
                                setLocalMaxes({
                                    ...localMaxes,
                                    squat:
                                        parseFloat(e.target.value) || 0,
                                })
                            }
                            onBlur={submit}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bench">Bench Press (kg)</Label>
                        <Input
                            id="bench"
                            type="number"
                            value={localMaxes.bench}
                            onChange={(e) =>
                                setLocalMaxes({
                                    ...localMaxes,
                                    bench:
                                        parseFloat(e.target.value) || 0,
                                })
                            }
                            onBlur={submit}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="deadlift">Deadlift (kg)</Label>
                        <Input
                            id="deadlift"
                            type="number"
                            value={localMaxes.deadlift}
                            onChange={(e) =>
                                setLocalMaxes({
                                    ...localMaxes,
                                    deadlift:
                                        parseFloat(e.target.value) || 0,
                                })
                            }
                            onBlur={submit}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
