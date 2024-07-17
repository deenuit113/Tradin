import styled from 'styled-components';

export const PopupContainer = styled.div<{ $darkMode: boolean }>`
    position: fixed;
    bottom: 0px;
    right: 0px;
    background-color: ${({ $darkMode }) => ($darkMode ? '#333' : '#fff')};
    border: 1px solid ${({ $darkMode }) => ($darkMode ? '#555' : '#ccc')};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: ${({ $darkMode }) => ($darkMode ? '#fff' : '#000')};
    z-index: 1000;
    width: 600px;
    height: 360px;
`;

export const CloseButton = styled.button<{ $darkMode: boolean }>`
    background: none;
    border: none;
    color: ${({ $darkMode }) => ($darkMode ? '#fff' : '#333')};
    font-size: 30px;
    position: absolute;
    top: 2px;
    right: 42px;
    cursor: pointer;
    z-index: 1500;
`;