import { type ReactNode } from 'react';

import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) => {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppHeaderLayout>
    );
};
