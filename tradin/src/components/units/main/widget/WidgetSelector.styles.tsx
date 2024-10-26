import styled from "@emotion/styled";
import { animated } from "react-spring";

export const SelectorContainer = styled(animated.div)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.selectorBackgroundColor};
    border-top: 1px solid #ccc;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1002;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;

    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 10px;
    }
`;

export const SelectorHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem 1rem 1rem;
    border-bottom: 1px solid #ccc;
`;

export const SelectorHeaderTitle = styled.h3`
    color: ${({ theme }) => theme.textColor};

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 1rem;
    }
`

export const CloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: ${({ theme }) => theme.iconColor};
    width: 30px;
    height: 30px;
    transform-origin: center center;
    padding: 0;
    
    &:hover {
        transform: rotate(180deg);
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 15px;
    }
`;

export const WidgetOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    overflow-x: auto;
    white-space: nowrap;
    height: 250px;
    padding: 10px 0px;

    &::-webkit-scrollbar {
        height: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.scrollbarThumbColor};
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
            height: 12px;
        }
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        height: 180px;
    }
`;

export const WidgetOption = styled.div`
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    width: 250px;
    
    @media all and (min-width:359px) and (max-width: 799px) {
        width: 180px;
    }
`;
export const NoWidgetMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 18px;
    color: #888;
`;