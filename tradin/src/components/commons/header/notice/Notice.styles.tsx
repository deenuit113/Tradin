import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { keyframes } from "@emotion/react";
import { FaBell } from "react-icons/fa";

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

export const BellIconContainer = styled.div<{ isDragging: boolean; dragDistance: number }>`
    position: relative;
    display: inline-block;

    .Notification-Icon {
        transform-origin: top center;
        transform: ${props => props.isDragging ? `rotate(${props.dragDistance * -0.1}deg)` : 'none'};
        transition: transform 0.1s ease;
    }
`;


export const VolumeSliderContainer = styled.div`
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 80px;
    }
`;

export const VolumeSlider = styled.div<{ volume: number }>`
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.notificationVolumeSliderBackgroundColor};
    border-radius: 5px;

    &::after {
        content: '';
        display: block;
        width: ${props => props.volume * 100}%;
        height: 100%;
        background-color: #4CAF50;
        border-radius: 5px;
        transition: width 0.1s ease;
    }
`;

export const UnreadBadge = styled.div`
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 800;
    user-select: none;

    @media all and (min-width: 359px) and (max-width: 799px) {
        top: -3px;
        right: -3px;
        width: 15px;
        height: 15px;
        font-size: 8px;
        font-weight: 800;
    }
`;

export const FaBellContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        animation: ${shakeAnimation} 0.5s ease-in-out 0s 1;
        transform-origin: top center;
    }
`;

export const FaBellIcon = styled(FaBell)`
    color: ${({ theme }) => theme.iconColor};
    cursor: pointer;
    font-size: 1.6rem;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 1.5rem;
    }
`

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
        backgroundColor: 'transparent',
        border: 'none',
    }
};