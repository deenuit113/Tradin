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
    margin-bottom: 0.5rem;
    transition: width 0.3s ease, margin-left 0.3s ease;
    
    .FaAngleRight{
        margin-left: 10px;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 100%;
    overflow-y: auto;
    padding: 2rem;

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

    @media all and (min-width:359px) and (max-width: 799px) {
        margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
        padding: 1rem 2rem;
    }
`;

export const WidgetContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    padding: 1rem 2rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: visible;
`;

export const OptionToggleButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 6px 6px 0px 0px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    position: relative;
    z-index: 2;
    .FilterIcon {
        margin-right: 5px;
    }
`;

export const OptionsContainer = styled.div<{ isVisible: boolean }>`
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: ${({ isVisible }) => (isVisible ? '1rem 2rem' : '0 2rem')};
    border-radius: 0px 0px 8px 8px;
    overflow: hidden;
    transform-origin: top center;
    position: relative;
    z-index: 1;
    margin-top: -1px;
    max-height: ${({ isVisible }) => (isVisible ? '1000px' : '0')};
    opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    
    transition: 
        max-height 0.3s ease-in-out,
        opacity 0.3s ease-in-out,
        visibility 0.3s ease-in-out,
        padding 0.3s ease-in-out;
`;

export const OptionTitle = styled.h4`

`

export const BackTestButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    float: right;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
`

export const ResultContainer = styled.div`
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    width: 100%;
    flex-grow: 1; // Allow it to grow within the WidgetContainer
    padding: 1rem 2rem;
    border-radius: 8px;
    overflow: auto; // Allow scroll within the result container if needed
    margin-top: 2rem;
`;

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh; // Set a relative height
    overflow: hidden;
    canvas {
        width: 100% !important;
        height: auto !important;
    }
    @media all and (max-width: 800px) {
        padding: 0;
    }
`;