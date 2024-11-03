import styled from "@emotion/styled";
import { FaPlay } from "react-icons/fa";

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

export const FilterOption = styled.label`

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

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
`

export const BackTestButton = styled.button`
    background-color: ${({ theme }) => theme.backTestButtonColor};
    font-weight: 700;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;

    &:hover {
        background-color: ${({ theme }) => theme.backTestButtonHoverColor};
    }

    .BackTestIcon {
        margin-right: 5px;
    }
`;

export const styledPlayIcon = styled(FaPlay)`

`