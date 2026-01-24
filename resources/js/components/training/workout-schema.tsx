import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export interface Lift {
    sets: number;
    reps: number;
    weight: number;
    label: string;
}

export interface Block {
    exercise: string;
    exerciseLabel: string;
    lifts: Lift[];
    cues: string[];
}

export interface Schema {
    day: number;
    week: number;
    blocks: Block[];
}

interface WorkoutSchemaProps {
    schema: Schema;
}

export function WorkoutSchema({ schema }: WorkoutSchemaProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                    Week {schema.week} — Day {schema.day}
                </h3>
            </div>

            <div className="space-y-4">
                {schema.blocks.map((block, index) => (
                    <WorkoutBlock
                        key={index}
                        block={block}
                    />
                ))}
            </div>
        </div>
    );
}

interface WorkoutBlockProps {
    block: Block;
}

function WorkoutBlock({ block }: WorkoutBlockProps) {
    const [isOpen, setIsOpen] = useState(true);

    // Calculate block label (total sets)
    const totalSets = block.lifts.reduce((sum, lift) => sum + lift.sets, 0);

    // Helper to calculate the Display Set Number (sequential across all lifts)
    let currentSetCount = 0;

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between p-4">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent -ml-2">
                        {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                        <span className="font-semibold text-lg">{block.exerciseLabel} <span className="text-muted-foreground text-sm ml-2 font-normal">× {totalSets}</span></span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <div className="px-4 pb-4 pt-0">
                    <Separator className="mb-4" />
                    {block.cues && block.cues.length > 0 && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-md">
                            <div className="flex items-start gap-2">
                                <Info className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <div className="text-sm space-y-1">
                                    <div className="font-medium text-muted-foreground">Form cues:</div>
                                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                        {block.cues.map((cue, idx) => (
                                            <li key={idx}>{cue}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid gap-2">
                        {block.lifts.map((lift, liftIndex) => {
                            // Render N rows for this lift
                            const rows = [];
                            for (let i = 0; i < lift.sets; i++) {
                                currentSetCount++;
                                rows.push(
                                    <div key={`${liftIndex}-${i}`} className="grid grid-cols-3 items-center py-2 text-center md:text-left rounded-md">
                                        <div className="font-mono text-sm">Set {currentSetCount}</div>
                                        <div className="font-mono text-sm">{lift.reps}</div>
                                        <div className="font-mono text-sm">{Math.round(lift.weight)} kg</div>
                                    </div>
                                );
                            }

                            // Wrapping Lift in details
                            return (
                                <details key={liftIndex} className="group">
                                    <summary className="flex cursor-pointer list-none items-center gap-2 py-2 font-medium text-muted-foreground hover:text-foreground">
                                        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                                        <span>{lift.label}</span>
                                    </summary>
                                    <div className="pl-6 grid gap-2">
                                        <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground mb-1 text-center md:text-left uppercase tracking-wider">
                                            <div>Set</div>
                                            <div>Reps</div>
                                            <div>Weight</div>
                                        </div>
                                        {rows}
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
