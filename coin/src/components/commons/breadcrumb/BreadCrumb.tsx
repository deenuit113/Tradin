/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { getPathLabel } from './PageStructure';
import { FaHome, FaChevronRight, FaPencilAlt } from 'react-icons/fa';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(70, 130, 180, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(70, 130, 180, 0); }
    100% { box-shadow: 0 0 0 0 rgba(70, 130, 180, 0); }
`;

const BreadcrumbContainer = styled.div`
    padding: 12px 20px;
    background-color: transparent;
    border-radius: 8px;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease-out;
`;

const BreadcrumbList = styled.ol`
    list-style: none;
    padding: 10px 15px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: transparent;
    border-radius: 6px;
`;

const BreadcrumbItem = styled.li`
    display: flex;
    align-items: center;
    font-size: 15px;
    color: ${({ theme }) => theme.breadcrumbTextColor};
    transition: all 0.3s ease;

    &:last-of-type {
        font-weight: 600;
    }

    &:hover {
        transform: translateY(-2px);
    }
`;

const BreadcrumbLink = styled(Link)`
    color: ${({ theme }) => theme.breadcrumbLinkColor};
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    padding: 5px 10px;
    border-radius: 4px;
`;

const Separator = styled(FaChevronRight)`
    margin: 0 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.breadcrumbSeparatorColor};
`;

const EditIcon = styled(FaPencilAlt)`
    cursor: pointer;
    margin-left: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.breadcrumbEditIconColor};
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.breadcrumbLinkHoverColor};
        transform: rotate(15deg);
    }
`;

const EditInput = styled.input`
    font-size: 14px;
    padding: 4px 8px;
    border: 2px solid ${({ theme }) => theme.breadcrumbEditInputBorderColor};
    border-radius: 4px;
    outline: none;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.3s ease-out, ${pulse} 1.5s infinite;
    background-color: ${({ theme }) => theme.breadcrumbBackgroundColor};
    color: ${({ theme }) => theme.textColor};

    &:focus {
        border-color: ${({ theme }) => theme.breadcrumbLinkHoverColor};
    }
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
                    <BreadcrumbLink href="/">
                        <FaHome style={{ marginRight: '5px' }} />
                        메인
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const isEditable = isEditablePath(pathSegments.slice(0, index + 1));
                    const label = getPathLabel(url);

                    return (
                        <React.Fragment key={url}>
                            <Separator />
                            <BreadcrumbItem>
                                {editingSegment === segment ? (
                                    <EditInput
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleSave(index)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSave(index)}
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        {isLast ? (
                                            <span>{label}</span>
                                        ) : (
                                            <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
                                        )}
                                        {isEditable && (
                                            <EditIcon onClick={() => handleEdit(segment, index)} />
                                        )}
                                    </>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;