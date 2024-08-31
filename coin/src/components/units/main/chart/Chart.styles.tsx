import styled from 'styled-components';

export const PopupContainer = styled.div`
    position: fixed;
    bottom: 0px;
    right: 0px;
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.iconColor};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    z-index: 1000;
    width: 600px;
    height: 360px;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.iconColor};
    font-size: 30px;
    position: absolute;
    top: 2px;
    right: 42px;
    cursor: pointer;
    z-index: 1500;
`;