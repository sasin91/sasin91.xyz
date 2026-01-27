export interface Program {
    key: string;
    name: string;
    style: string;
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
