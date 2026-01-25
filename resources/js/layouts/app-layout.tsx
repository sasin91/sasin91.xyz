import { ReactNode } from 'react';

import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    mainVariant?: 'header' | 'sidebar';
}

export default ({
    children,
    breadcrumbs,
    mainVariant = 'header',
    ...props
}: AppLayoutProps) => {
    return (
        <AppHeaderLayout
            breadcrumbs={breadcrumbs}
            mainVariant={mainVariant}
            {...props}
        >
            {children}
        </AppHeaderLayout>
    );
};
