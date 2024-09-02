import styled from "@emotion/styled";
import { Theme as CustomTheme } from '../../../styles/theme'

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
    padding: 5px 10px;

    .Currency-Unit-Switch {
        margin: 0px 15px 0px 15px;
    }

    p {
        font-size: 16px;
        margin: 0;
        position: relative;
        font-weight: 550;
        color: ${({ theme }) => theme.textColor};
    }
    sub {
        font-size: 12px;
        font-weight: 350;
        color: ${({ theme }) => theme.timeTextColor};
        position: absolute;
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
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        padding-bottom: 20px;
    }
`;

export const WidgetGridContainer = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 0rem 1rem 0rem 1rem;
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

export const Widget = styled.div<{ isDragging: boolean }>`
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid lightgray;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 1rem;
    width: 240px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
    transition: transform 0.3s ease;
    transform: ${({ isDragging }) => (isDragging ? 'scale(1.05)' : 'scale(1)')};
    :hover {
        transform: scale(1.05);
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 230px;
        height: 190px;
    }
`;

export const WidgetAdd = styled.div`
    background-color: ${({ theme }) => theme.widgetAddBackgroundColor};
    border: 1px solid lightgray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1rem;
    width: 240px;
    height: 200px;
    margin: auto;
    position: relative;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 230px;
        height: 190px;
    }
`;

export const CoinTimeStamp = styled.p`
    color: gray;
    font-size: 11px;
    margin-top: 20px;

    @media all and (min-width:359px) and (max-width: 799px) {
        margin-top: 10px;
    }
`

export const WidgetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ theme }) => theme.textColor};
    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 3px;
    }
`;

export const WidgetTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
`

export const MenuIcon = styled.div`
    cursor: pointer;

    .MenuIcon {
        color: ${({ theme }) => theme.textColor};
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    background-color: ${({ theme }) => theme.widgetBackgroundColor};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid lightgray;
    border-radius: 8px;
    right: 1rem;
    top: 2rem;
`;

export const DropdownItem = styled.div`
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
    
    &:hover {
        background-color: ${({ theme }) => theme.widgetDropDownHoverColor};
        border-radius: 8px;
    }
`;

export const WidgetContent = styled.div`
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    cursor: pointer;
    font-size: 1;
`;