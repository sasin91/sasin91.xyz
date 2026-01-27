export interface Program {
    key: string;
    name: string;
    type: string;
    days: number;
    weeks: number;
}

export type Maxes = Record<string, number>;

export interface Exercise {
    key: string;
    label: string;
    cues: string[];
    isPrimary: boolean;
}
