import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BreadcrumbUI from './BreadCrumb.presenter';

export default function Breadcrumb(): JSX.Element {
    const pathname = usePathname();
    const router = useRouter();
    const [editingSegment, setEditingSegment] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    const isEditablePath = (path: string[]) => {
        return (path[0] === 'spot' || path[0] === 'future') && path.length === 2;
    };

    const handleEdit = (segment: string, index: number) => {
        setEditingSegment(segment);
        setEditValue(segment);
    };

    const handleSave = (index: number) => {
        if (editValue.trim() !== '') {
            const newPathSegments = [...pathSegments];
            newPathSegments[index] = editValue.trim();
            const newPath = '/' + newPathSegments.join('/');
            router.push(newPath);
        }
        setEditingSegment(null);
    };

    return (
        <>
            <BreadcrumbUI
                pathSegments={pathSegments}
                handleSave={handleSave}
                handleEdit={handleEdit}
                editingSegment={editingSegment}
                editValue={editValue}
                isEditablePath={isEditablePath}
                setEditValue={setEditValue}
            />
        </>
    );
};