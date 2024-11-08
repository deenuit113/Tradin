import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FaChevronRight, FaPencilAlt } from 'react-icons/fa';


export const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(70, 130, 180, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(70, 130, 180, 0); }
    100% { box-shadow: 0 0 0 0 rgba(70, 130, 180, 0); }
`;

export const BreadcrumbContainer = styled.div`
    padding: 12px 20px;
    background-color: transparent;
    border-radius: 8px;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease-out;
`;

export const BreadcrumbList = styled.ol`
    list-style: none;
    padding: 10px 15px;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: transparent;
    border-radius: 6px;
`;

export const BreadcrumbItem = styled.li`
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

export const BreadcrumbLink = styled(Link)`
    color: ${({ theme }) => theme.breadcrumbLinkColor};
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    padding: 5px 10px;
    border-radius: 4px;
`;

export const Separator = styled(FaChevronRight)`
    margin: 0 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.breadcrumbSeparatorColor};
`;

export const EditIcon = styled(FaPencilAlt)`
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

export const EditInput = styled.input`
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