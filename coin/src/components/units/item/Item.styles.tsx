import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
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
    }
`;

export const SpotHeader = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    font-weight: bolder;
    color: ${({ theme }) => theme.textColor};
    
    .FaAngleRight{
        margin-left: 10px;
    }
`;

export const WidgetContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const WidgetHeader = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 1rem;
    cursor: pointer;

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 14px;
    }
`;

export const WidgetTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: ${({ theme }) => theme.textColor};

    .title{
        font-weight: bolder;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: 11px;
        }
    }

    .value{
        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: 8px;
        }
    }
`;

export const StrategyInfo = styled.td`
    border-left: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.textColor};

    &:first-of-type {
        border-left: none;
    }

    .position-icon {
        font-size: 18px;
    }
`;

export const StrategyInFoDetail = styled.td`
    border-left: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;
    color: #f0f0f0;

    &:first-of-type {
        border-left: none;
    }
`;

export const HorizontalDivider = styled.div`
    width: 100%;
    height: 2px;
    background-color: #ccc;
    margin: 1rem 0;
`;

export const TransactionHistory = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;

    th, td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #ccc;
        vertical-align: middle;
        border-right: 1px solid #ccc;
    }

    th {
        border-top: 1px solid #ccc;
    }

    th:last-child, td:last-child {
        border-right: none;
    }

    .title {
        font-weight: bold;
        color: ${({ theme }) => theme.textColor};
        text-align: center;
    }

    .value {
        color: ${({ theme }) => theme.textColor};
        text-align: center;
    }

    .bordered {
        border-right: 2px solid #ccc;
    }
`;