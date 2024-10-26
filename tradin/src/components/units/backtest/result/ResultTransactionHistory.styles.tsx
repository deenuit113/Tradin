import styled from '@emotion/styled';

// BackTest Result TransActionHistory

export const TransactionHistoryContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    padding: 0;
    border-radius: 6px;
    flex-shrink: 0;
`;

export const TransactionHistoryScroll = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: row;
    width: ${props => props.strategyCount > 2 ? '150%' : '100%'};
`;

export const StrategyTransactions = styled.div<{ strategyCount: number }>`
    display: flex;
    flex-direction: column;
    width: ${props => {
        if (props.strategyCount === 1) return '100%';
        if (props.strategyCount === 2) return '50%';
        return '50%';
    }};
    padding: 0 10px;
    height: 100%;
`;
export const StrategyTitle = styled.h3`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor};
    padding: 0 1rem;
`;

export const TransactionList = styled.div<{ isSkeleton : boolean }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0.5rem;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    border-radius: 4px;
    padding: 1rem;
    overflow-y: ${props => props.isSkeleton ? 'hidden' : 'auto'};

    &::-webkit-scrollbar {
        width: 8px;
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
            width: 8px;
        }
    }
`;

export const TransactionItem = styled.div<{ strategyCount: number }>`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;
    padding: ${props => {
        if (props.strategyCount === 1) return '1rem';
        return '10px';
    }};
    margin-bottom: 10px;
`;

export const TransactionDetail = styled.p<{ strategyCount: number }>`
    margin: 5px 0;
    color: ${({ theme }) => theme.textColor};
    font-size: ${props => {
        if (props.strategyCount === 1) return '1em';
        return '0.8em';
    }};
    font-weight: 700;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: ${props => {
            if (props.strategyCount === 1) return '0.9em';
            return '0.7em';
        }};
    }
`;

export const ProfitAmount = styled.span<{ isPositive: boolean }>`
    color: ${({ isPositive, theme }) => isPositive ? theme.ProfitPositiveColor: theme.ProfitNegativeColor};
    font-weight: bold;
`;