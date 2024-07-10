import styled from "@emotion/styled";

/*const getTransactionTypeColor = (transactionType: string) => {
    switch(transactionType) {
        case "BUY": 
            return 'blue';

        case "SELL":
            return 'red';

        default:
            return 'black';
    }
};*/

export const Container = styled.div<{ darkMode: boolean }>`
    display: flex;
    width: 100%;
    padding-top: 10vh;
    flex-direction: column;
    height: 100vh;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;

export const MainContent = styled.div<{ sidebarOpen: boolean, darkMode: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

export const SpotHeader = styled.div<{ sidebarOpen: boolean, darkMode: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    margin-top: 10px;
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    font-weight: bolder;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    position: relative;
    border: 1px solid red;

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
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const WidgetDetailContainer = styled.div<{ darkMode: boolean, selectedOption: number | null }>`
    width: ${({ selectedOption }) => (selectedOption ? '49.5%' : '100%')};
    margin-bottom: 1rem;
    background-color: ${({ darkMode }) => (darkMode ? '#ddd' : '#444')};
    border-radius: 8px;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const WidgetHeader = styled.div<{ darkMode: boolean }>`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding-left: 1rem;

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 14px;
    }
`;

export const WidgetTable = styled.table<{ darkMode: boolean, selectedOption: number | null }>`
    width: 100%;
    border-collapse: collapse;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};

    .title{
        font-weight: bolder;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '11px' : '13px')};
        }
    }

    .value{
        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '8px' : '10px')};
        }
    }
`;

export const StrategyInfo = styled.td<{ darkMode: boolean }>`
    border-left: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    
    &:first-of-type {
        border-left: none;
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

/*export const StrategyInFoType = styled.td<{ transactionType: string }>`
    border-left: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;

    &:first-of-type {
        border-left: none;
    }

    .type {
        color: ${({ transactionType }) => getTransactionTypeColor(transactionType)};
    }
`;
*/

export const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 1rem 0;
`;

export const TransactionHistory = styled.table<{ darkMode: boolean, selectedOption: number | null }>`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;

    th, td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid ${({ darkMode }) => (darkMode ? '#ccc' : '#ccc')};
        vertical-align: middle;
        border-right: 1px solid ${({ darkMode }) => (darkMode ? '#ccc' : '#ccc')};
    }

    th {
        border-top: 1px solid ${({ darkMode }) => (darkMode ? '#ccc' : '#ccc')};
    }

    th:last-child, td:last-child {
        border-right: none;
    }

    .title {
        font-weight: bold;
        font-size: 15px;
        color: ${({ darkMode }) => (darkMode ? 'black' : '#f0f0f0')};
        text-align: center;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '11px' : '13px')};
        }
    }

    .value {
        color: ${({ darkMode }) => (darkMode ? 'black' : '#f0f0f0')};
        text-align: center;
        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '8px' : '10px')};
        }
    }

    .bordered {
        border-right: 2px solid ${({ darkMode }) => (darkMode ? '#ccc' : '#ccc')};
    }

    .buy {
        color: blue;
        font-weight: bold;
    }

    .sell {
        color: red;
        font-weight: bold;
    }
`;

export const StrategyOption = styled.div`
    cursor: pointer;
    display: relative;
`;

export const StrategyOptionDrop = styled.div`
    padding: 1rem;
    position: absolute;
    background-color: #f0f0f0;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid lightgray;
    border-radius: 8px;
    right: 10px;
    top: 50px;
`;

export const OptionInnerContainer = styled.div`
`;

export const OptionTitle = styled.label`

`;

export const ComparisonOption = styled.label`

`;

export const OptionHorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
`;
