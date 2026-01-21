import type { PropsWithChildren } from 'react';

import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
    mainVariant = 'header',
}: PropsWithChildren<{
    breadcrumbs?: BreadcrumbItem[];
    mainVariant?: 'header' | 'sidebar';
}>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant={mainVariant}>{children}</AppContent>
        </AppShell>
    );
}
