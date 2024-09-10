import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { getPathLabel } from './PageStructure';

const decodeSegment = (segment: string): string => {
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
};

const encodeSegment = (segment: string): string => {
    return encodeURIComponent(segment);
};


const BreadcrumbContainer = styled.nav`
    padding: 10px 0;
    font-size: 14px;
`;

const BreadcrumbList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`;

const BreadcrumbItem = styled.li`
    &:not(:last-child)::after {
        content: '/';
        margin: 0 5px;
        color: #666;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: #0070f3;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const EditIcon = styled.span`
    cursor: pointer;
    margin-left: 5px;
`;

const EditInput = styled.input`
    font-size: 14px;
    padding: 2px 5px;
    margin-right: 5px;
`;

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [editingSegment, setEditingSegment] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

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
        <BreadcrumbContainer aria-label="breadcrumb">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const isEditable = isEditablePath(pathSegments.slice(0, index + 1));
                    const label = getPathLabel(url);

                    return (
                        <BreadcrumbItem key={url}>
                            {editingSegment === segment ? (
                                <>
                                    <EditInput
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleSave(index)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSave(index)}
                                        autoFocus
                                    />
                                </>
                            ) : (
                                <>
                                    {isLast ? (
                                        <span>{label}</span>
                                    ) : (
                                        <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
                                    )}
                                    {isEditable && (
                                        <EditIcon onClick={() => handleEdit(segment, index)}>✎</EditIcon>
                                    )}
                                </>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;