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

const slideOutLeft = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
`;

const moveUp = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100%);
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
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
    width: 120px;
`;

export const VolumeSlider = styled.div<{ volume: number }>`
    width: 100%;
    height: 5px;
    background-color: #ddd;
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
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 800;
    user-select: none;
`;

export const BellIcon = styled.div`
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        animation: ${shakeAnimation} 0.5s ease-in-out 0s 1;
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
    height: 90%;
    overflow-y: scroll;
    background-color: #DFDFDF;
    border-radius: 10px;

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

export const NotificationItem = styled.li<{ read: boolean; isRemoving: boolean; moveUp: boolean; dragX: number, isActive: boolean }>`
    margin: 0;
    border-top: 1px solid lightgrey;
    color: ${({ read }) => (read ? '#888' : '#000')};
    opacity: ${({ read }) => (read ? 0.6 : 1)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 10%;
    padding: 10px 20px 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease-out;
    animation: ${props => props.isRemoving ? slideOutLeft : 'none'} 0.3s forwards, ${props => props.moveUp ? moveUp : 'none'} 0.3s forwards;
    transform: translateX(${props => props.dragX}px);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1010;
    user-select: none;
`;

export const NotificationText = styled.span`
    flex-grow: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const NewBadge = styled.span`
    color: orange;
    font-weight: bold;
    margin-right: 5px;
`;

export const DeletedZone = styled.div<{ opacity: number }>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    padding-right: 20px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 1000;
    opacity: ${props => props.opacity};
    transition: opacity 0.3s ease;
`;

export const ModalContainer = styled.div`
    position: fixed;
    width: 30%;
    height: 80%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f2f2f2;
    padding: 30px 20px 30px 20px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: hidden;
    z-index: 1002;

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 80%;
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
    z-index: 1010;
    &:hover {
        color: #333;
    }
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const NotificationIcon = styled.div`
    font-size: 20px;
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const DeleteAllIcon = styled.div`
    position: relative;
    cursor: pointer;
    font-size: 20px;
    color: #888;

    &:hover {
        color: #333;
    }

    &:hover > div {
        display: block;
    }
`;

export const Tooltip = styled.div`
    display: none;
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    font-size: 12px;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
`;

export const ConfirmDialog = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1020;
`;

export const ConfirmButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

export const ConfirmButton = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export const CancelButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #da190b;
    }
`;