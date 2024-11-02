import React from 'react';
import { getPathLabel } from './PageStructure';
import { FaHome } from 'react-icons/fa';
import * as S from "./BreadCrumb.styles";
import { BreadCrumbUIProps } from './BreadCrumb.types';

export default function BreadcrumbUI(props: BreadCrumbUIProps): JSX.Element {

    return (
        <S.BreadcrumbContainer aria-label="breadcrumb">
            <S.BreadcrumbList>
                <S.BreadcrumbItem>
                    <S.BreadcrumbLink href="/">
                        <FaHome style={{ marginRight: '5px' }} />
                        메인
                    </S.BreadcrumbLink>
                </S.BreadcrumbItem>
                {props.pathSegments.map((segment, index) => {
                    const url = `/${props.pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === props.pathSegments.length - 1;
                    const isEditable = props.isEditablePath(props.pathSegments.slice(0, index + 1));
                    const label = getPathLabel(url);

                    return (
                        <React.Fragment key={url}>
                            <S.Separator />
                            <S.BreadcrumbItem>
                                {props.editingSegment === segment ? (
                                    <S.EditInput
                                        value={props.editValue}
                                        onChange={(e) => props.setEditValue(e.target.value)}
                                        onBlur={() => props.handleSave(index)}
                                        onKeyPress={(e) => e.key === 'Enter' && props.handleSave(index)}
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        {isLast ? (
                                            <span>{label}</span>
                                        ) : (
                                            <S.BreadcrumbLink href={url}>{label}</S.BreadcrumbLink>
                                        )}
                                        {isEditable && (
                                            <S.EditIcon onClick={() => props.handleEdit(segment, index)} />
                                        )}
                                    </>
                                )}
                            </S.BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </S.BreadcrumbList>
        </S.BreadcrumbContainer>
    );
};