import React from 'react';
import { usePathname } from 'next/navigation';
import BreadcrumbUI from './BreadCrumb.presenter';

export default function Breadcrumb(): JSX.Element {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    return <BreadcrumbUI pathSegments={pathSegments} />;
}