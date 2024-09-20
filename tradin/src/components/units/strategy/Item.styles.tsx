import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    background-color: ${({ theme }) => theme.backgroundColor};
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
    padding: 1rem 3rem;

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

export const SpotHeader = styled.div<{ sidebarOpen: boolean }>`
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
    margin-bottom: 1rem;
    transition: width 0.3s ease, margin-left 0.3s ease;
    
    .FaAngleRight{
        margin-left: 10px;
    }
`;

export const WidgetContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    padding: 1rem;
    border-radius: 8px;
`;

export const WidgetHeader = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 1rem;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 20px 10px 20px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 14px;
    }
`;

export const WidgetTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: ${({ theme }) => theme.textColor};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    padding: 30px 20px 30px 20px;
    .title{
        font-weight: 900;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: 11px;
        }
    }

    .value{
        font-weight: 500;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: 8px;
        }
    }
`;

export const StrategyInfo = styled.td`
    border-left: 1px solid ${({ theme }) => theme.innerbackgroundColor};;
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
    background-color: #444;
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