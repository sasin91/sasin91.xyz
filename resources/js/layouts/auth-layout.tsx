import { ReactNode } from 'react';

import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';

interface AuthLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AuthLayout({
  children,
  breadcrumbs,
  ...props
}: AuthLayoutProps) {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppHeaderLayout>
  );
}
