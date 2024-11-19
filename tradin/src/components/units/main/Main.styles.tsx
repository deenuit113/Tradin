import styled from "@emotion/styled";
import { Theme as CustomTheme } from '../../../styles/theme'
import Switch from 'react-switch';
import { FaCaretDown, FaCaretUp, FaDollarSign, FaWonSign } from "react-icons/fa";

declare module "@emotion/react" {
    export interface Theme extends CustomTheme {}
}

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const CurrencyToggleContainer = styled.div<{ sidebarOpen: boolean }>`
    display: flex;
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    align-items: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    justify-content: flex-end;
    padding: 5px 10px 15px 10px;
    background-color: transparent;
    gap: 15px;

    p {
        font-size: 16px;
        margin: 0;
        position: relative;
        font-weight: 700;
        color: ${({ theme }) => theme.textColor};
    }
    sub {
        display: none;
        font-size: 12px;
        font-weight: 350;
        color: ${({ theme }) => theme.timeTextColor};
        position: absolute;
        margin-top: 5px;
        left: 0;
        top: 100%;
        white-space: nowrap;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s linear;
    }
    p:hover sub {
        visibility: visible;
        opacity: 1;
        display: block;
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        padding-bottom: 10px;
        p {
            font-size: 13px;
        }

        sub {
            font-size: 10px;
        }

        .Currency-Unit-Switch {
            transform: scale(0.8);
        }
    }
`;

export const WidgetGridContainer = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    row-gap: 3rem;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1.5rem 1rem 1rem 1rem;
    height: 100%;
    overflow-y: auto;
    justify-items: center;
    align-items: center;

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

    @media all and (min-width: 359px) and (max-width: 799px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.5rem;
        row-gap: 2rem;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1rem;
    height: 100%;
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


export const WidgetAdd = styled.div`
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 1rem;
    width: 240px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
    transition: transform 0.3s ease;

    :hover {
        transform: scale(1.05);
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 180px;
        height: 150px;

        .PlusIcon {
            font-size: 30px;
        }
    }
`

export const PriceChangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

export const PriceUPIcon = styled(FaCaretUp)`
    color: ${({ theme }) => theme.priceUpIconColor};
`

export const PriceDownIcon = styled(FaCaretDown)`
    color: ${({ theme }) => theme.priceDownIconColor};
`

export const CoinTimeStamp = styled.p`
    color: gray;
    font-size: 11px;
    margin-top: 10px;

    @media all and (min-width:359px) and (max-width: 799px) {
        margin-top: 5px;
        font-size: 9px !important;
    }
`

export const WidgetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.textColor};
    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 3px;
    }
`;

export const WidgetTitle = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    gap: 5px;

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 12px;
    }
`

export const WidgetContent = styled.div`
    color: ${({ theme }) => theme.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    overflow: hidden;
    gap: 5px;

    #LoadingIcon{
        font-size: 30px;
    }

    .coin-price {
        font-size: 15px;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        .coin-price{
            font-size: 14px;
        }

        span {
            font-size: 12px;
        }
    }
`;

export const AddWidgetButton = styled.button`
    background-color: ${({ theme }) => theme.widgetAddColor};
    color: #f0f0f0;
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    font-size: 1;

    .PlusIcon {
        font-size: 3rem;
    }
`;

