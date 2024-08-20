import styled from "styled-components";
import { animated } from "react-spring";

export const SelectorContainer = styled(animated.div)<{ $darkMode: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ $darkMode }) => ($darkMode ? '#f0f0f0' : '#333')};
    border-top: 1px solid #ccc;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1002;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;
`;

export const SelectorHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
`;

export const SelectorHeaderTitle = styled.h3<{ $darkMode: boolean }>`
    color: ${({ $darkMode }) => ($darkMode ? '#333' : '#f0f0f0')};
`

export const CloseButton = styled.button<{ $darkMode: boolean }>`
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: ${({ $darkMode }) => ($darkMode ? '#333' : '#f0f0f0')};
    
    &:hover {
        transform: rotate(180deg);
    }
`;

export const WidgetOptionContainer = styled.div<{ $darkMode: boolean }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    overflow-x: auto;
    white-space: nowrap;
    height: 250px; /* 높이 고정 */
    &::-webkit-scrollbar {
        height: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ $darkMode }) => ($darkMode ? '#888' : '#f0f0f0')};
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
`;

export const WidgetOption = styled.div`
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    width: 250px;
`;

export const NoWidgetMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 18px;
    color: #888;
`;