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

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 90vh;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: ${({ theme }) => theme.backgroundColor};
    overflow-y: hidden;
`;

export const MainContent = styled.div<{ sidebarOpen: boolean, selectedOption: number | null }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: grid;
    grid-template-columns: ${({ selectedOption }) => (selectedOption ? "1fr 1fr" : "1fr")};
    gap: 1rem;
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
        margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "30%" : "0")};
    }
`;

export const SpotHeader = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    font-weight: bolder;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    padding: 1rem;
    position: relative;
    font-size: 1rem;

    .FaAngleRight{
        margin-left: 10px;
    }

    div {
        font-size: 1rem;
    }
`;

export const WidgetDetailContainer = styled.div`
    width: 100%;
    margin-top: 0.7rem;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    border-radius: 8px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
`;

export const WidgetHeader = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;
    padding: 1rem 1.8rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 14px;
    }
`;

export const WidgetTable = styled.table<{ selectedOption: number | null }>`
    width: 100%;
    border-collapse: collapse;
    color: ${({ theme }) => theme.textColor};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};

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

export const StrategyInfo = styled.td`
    border-left: 1px solid ${({ theme }) => theme.innerbackgroundColor};
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.textColor};
    
    &:first-of-type {
        border-left: none;
    }

    .position-icon {
        font-size: 20px;
    }
`;

export const StrategyInFoDetail = styled.td`
    border-left: 1px solid ${({ theme }) => theme.innerbackgroundColor};
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
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    margin: 1rem 0;
`;

export const TransactionHistory = styled.table<{ selectedOption: number | null }>`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    padding: 30px 20px 30px 20px;


    th, td {
        padding: 0.7rem;
        text-align: left;
        border-bottom: 1px solid  ${({ theme }) => theme.innerbackgroundColor};
        vertical-align: middle;
        border-right: 1px solid  ${({ theme }) => theme.innerbackgroundColor};
    }

    th {
        border-top: 1px solid  ${({ theme }) => theme.innerbackgroundColor};
    }

    th:last-child, td:last-child {
        border-right: none;
    }

    .title {
        font-weight: bold;
        font-size: 15px;
        color: ${({ theme }) => theme.textColor};
        text-align: center;

        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '11px' : '13px')};
        }
    }

    .value {
        color: ${({ theme }) => theme.textColor};
        text-align: center;
        @media all and (min-width:359px) and (max-width: 799px) {
            font-size: ${({ selectedOption }) => (selectedOption ? '8px' : '10px')};
        }
    }

    .bordered {
        border-right: 1px solid  ${({ theme }) => theme.innerbackgroundColor};
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

    display: flex;
    align-items: center;
    // css 세로 중앙 정렬 기능 추가 > align-content: center;

    .OptionIcon {
        margin-left: 20px;
    }
`;

export const StrategyOptionDrop = styled.div`
    padding: 1rem;
    position: absolute;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({ theme }) => theme.moreinnerbackgroundColor};;
    border-radius: 8px;
    right: 10px;
    top: 50px;
`;

export const OptionInnerContainer = styled.div`
`;

export const OptionFilterContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
`;

export const OptionTitle = styled.label`
    color: ${({ theme }) => theme.textColor};
`;

export const ComparisonOption = styled.label`
    color: ${({ theme }) => theme.textColor};
`;

export const OptionHorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    margin: 10px 0;
`;

export const FilterOption = styled.label`

`;

