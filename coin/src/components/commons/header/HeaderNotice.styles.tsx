import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { keyframes } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const shakeAnimation = keyframes`
    0%, 100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(-15deg);
    }
    50% {
        transform: rotate(15deg);
    }
    75% {
        transform: rotate(-10deg);
    }
`;

const slideDown = keyframes`
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

interface ModalStyles {
    overlay?: CSSProperties;
    content?: CSSProperties;
}

export const modalStyles: ModalStyles = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        top: '50%',
        left: '50%',
        width: '5%',
        height: '1%',
    }
};

export const BellIcon = styled.div`
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        animation: ${shakeAnimation} 0.5s ease-in-out 0s 2;
        transform-origin: top center;
    }
`;

export const CloseButton = styled.button`
    position: fixed;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: ${({ theme }) => theme.iconColor};
    
    &:hover {
        transform: rotate(180deg);
    }
`;

export const NotificationList = styled.ul`
    list-style: none;
    padding: 0;
    border: 1px solid red;
    height: 90%;
    overflow-y: scroll;

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
`;

export const NotificationItem = styled.li<{ read: boolean }>`
    margin: 10px 0;
    border-top: 1px solid lightgrey;
    color: ${({ read }) => (read ? '#888' : '#000')};
    opacity: ${({ read }) => (read ? 0.6 : 1)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 10%;
    padding: 0px 20px 0px 20px;
    cursor: pointer;
`;

export const ModalContainer = styled.div`
    position: fixed;
    width: 30%;
    height: 80%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f2f2f2;
    padding: 20px 10px 20px 10px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: hidden;
    z-index: 1002;

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 95%;
        height: 80%;
        padding-left: 10px;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const ModalButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const ReadButton = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? '#007BFF' : '#f0f0f0')};
    color: ${({ active }) => (active ? '#fff' : '#000')};
    border: 1px solid ${({ active }) => (active ? '#007BFF' : '#ddd')};
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
    }
`;


export const TrashIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    color: #888;
    &:hover {
        color: #333;
    }
`;