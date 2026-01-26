export interface Program {
    slug: string;
    name: string;
    type: string;
    days: number;
    weeks: number;
}

export type Maxes = Record<string, number>;

export interface Exercise {
    slug: string;
    label: string;
    cues: string[];
    isPrimary: boolean;
}
