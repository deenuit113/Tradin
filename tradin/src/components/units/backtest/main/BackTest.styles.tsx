import styled from "@emotion/styled";

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bolder;
    color: ${({ theme }) => theme.textColor};
    padding: 0rem 1rem;
    background-color: ${({ theme }) => theme.breadcrumbBackgroundColor};
    transition: width 0.3s ease, margin-left 0.3s ease;
    
    .FaAngleRight{
        margin-left: 10px;
    }

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
        padding: 0.5rem;
    }
`;

export const BackTestContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: visible;

    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 1rem;
    }
`;

export const OptionToggleButton = styled.button<{ isVisible: boolean }>`
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: ${({ isVisible }) => (isVisible ? '6px 6px 0px 0px' : '6px')};
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    color: ${({ theme }) => theme.textColor};
    position: relative;
    z-index: 2;
    transition: border-radius 0.3s ease-in-out;
    .FilterIcon {
        margin-right: 5px;
        color: ${({ theme }) => theme.iconColor};
    }
`;