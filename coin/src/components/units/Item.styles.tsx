import styled from "@emotion/styled";

export const Container = styled.div<{ darkMode: boolean }>`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;

export const MainContent = styled.div<{ sidebarOpen: boolean, darkMode: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "90%" : "100%")};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1rem;
    height: 90%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ darkMode }) => (darkMode ? '#888' : '#f0f0f0')};
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
        margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "30%" : "0")};
    }
`;

export const SpotHeader = styled.div<{ darkMode: boolean }>`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    font-weight: bolder;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    
    .FaAngleRight{
        margin-left: 10px;
    }
`;

export const WidgetContainer = styled.div<{ darkMode: boolean }>`
    width: 100%;
    margin-bottom: 1rem;
    background-color: ${({ darkMode }) => (darkMode ? '#ddd' : '#444')};
    padding: 1rem;
    border-radius: 8px;
`;

export const WidgetHeader = styled.div<{ darkMode: boolean }>`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    margin-bottom: 1rem;

    @media all and (min-width:359px) and (max-width: 699px) {
        font-size: 14px;
    }
`;

export const WidgetTable = styled.table<{ darkMode: boolean }>`
    width: 100%;
    border-collapse: collapse;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};

    .title{
        font-weight: bolder;

        @media all and (min-width:359px) and (max-width: 699px) {
            font-size: 11px;
        }
    }

    .value{
        @media all and (min-width:359px) and (max-width: 699px) {
            font-size: 8px;
        }
    }
`;

export const WidgetCell = styled.td`
    border-left: 2px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;

    &:first-of-type {
        border-left: none;
    }
`;