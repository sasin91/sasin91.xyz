import * as React from 'react';

import { SidebarInset } from '@/components/ui/sidebar';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({
    variant = 'header',
    children,
    ...props
}: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className="relative isolate flex min-h-svh w-full flex-col to-magenta-100/20 bg-linear-to-br from-background via-cyan-100/5"
            {...props}
        >
            {children}
        </main>
    );
}
