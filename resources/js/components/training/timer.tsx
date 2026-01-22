import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

export function Timer({ startTime, className }: { startTime?: Date; className?: string }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const start = startTime ? startTime.getTime() : Date.now();
        const interval = setInterval(() => {
            setSeconds(Math.floor((Date.now() - start) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const format = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? `${h}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Card className={`p-4 font-mono text-2xl font-bold flex justify-center items-center ${className}`}>
            {format(seconds)}
        </Card>
    );
}
