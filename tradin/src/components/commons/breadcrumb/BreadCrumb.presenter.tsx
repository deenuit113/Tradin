import React from 'react';
import { getPathLabel } from './PageStructure';
import { FaHome } from 'react-icons/fa';
import { BreadCrumbUIProps } from './BreadCrumb.types';
import { 
    BreadcrumbCurrentLink, 
    BreadcrumbLink, 
    BreadcrumbRoot 
} from '@/components/ui/breadcrumb';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from '@/components/ui/menu';
import { LuChevronDown } from 'react-icons/lu';
export default function BreadcrumbUI(props: BreadCrumbUIProps): JSX.Element {
    // mock
    const mockData = [
        { name: '1', id: '1' },
        { name: '2', id: '2' },
        { name: '3', id: '3' },
    ];

    return (
        <BreadcrumbRoot aria-label="breadcrumb">
            <BreadcrumbLink href="/">
                <FaHome style={{ marginRight: '5px' }} />
                메인
            </BreadcrumbLink>

            {props.pathSegments.map((segment, index) => {
                const url = `/${props.pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === props.pathSegments.length - 1;
                const label = getPathLabel(url);

                const isDropdown = segment === 'spot' || segment === 'future';

                return (
                    <React.Fragment key={url}>
                        {isLast ? (
                            <BreadcrumbCurrentLink>{label}</BreadcrumbCurrentLink>
                        ) : isDropdown ? (
                            <MenuRoot> 
                                <MenuTrigger asChild>
                                    <BreadcrumbLink as="button">
                                        {label} <LuChevronDown />
                                    </BreadcrumbLink>
                                </MenuTrigger>
                                <MenuContent bg="backgroundColor">
                                    {mockData.map((item) => (
                                        <MenuItem key={item.id} value={item.id} asChild>
                                            <a href={`/${segment}/${item.id}`}>{item.name}</a>
                                        </MenuItem>
                                    ))}
                                </MenuContent>
                            </MenuRoot>
                        ) : (
                            <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
                        )}
                    </React.Fragment>
                );
            })}
        </BreadcrumbRoot>
    );
}