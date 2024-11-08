import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const shimmer = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const BackTestHeader = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    height: 10%;
    background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.skeletonBaseColor} 0%,
        ${({ theme }) => theme.skeletonHighlightColor} 50%,
        ${({ theme }) => theme.skeletonBaseColor} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite linear;
    transition: width 0.3s ease, margin-left 0.3s ease;

    @media (max-width: 799px) {
        height: 8%;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    max-width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ theme }) => theme.scrollbarThumbColor};
        border-radius: 6px;
        transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 12px;
        }
    }

    @media (max-width: 799px) {
        padding: 2rem;
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    margin-top: -1px;
    height: auto;

    background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.skeletonBaseColor} 0%,
        ${({ theme }) => theme.skeletonHighlightColor} 50%,
        ${({ theme }) => theme.skeletonBaseColor} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite linear;
`;