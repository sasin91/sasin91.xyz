import { Link, usePage } from '@inertiajs/react';
import { LogIn, Save } from 'lucide-react';
import { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { login, register } from '@/wayfinder/routes';
import type { Inertia } from '@/wayfinder/types';

/**
 * Guests train against session state, which is lost when the browser
 * session ends. Offer them a way to keep it.
 */
export default function GuestProgressNotice(
    props: ComponentProps<typeof Card>,
) {
    const { auth } = usePage<Inertia.SharedData>().props;

    if (auth.user) {
        return null;
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Your progress is saved on this device
                </CardTitle>
                <CardDescription>
                    Maxes and workouts are kept in this browser session. Log in
                    to save them to your account and continue right where you
                    left off.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                    <Link href={login()}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Log in to save
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={register()}>Create an account</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
