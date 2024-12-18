import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5); /* 크기만 변화 */
    }

    to {
        opacity: 1;
        transform: scale(1); /* 원래 크기로 */
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

export const ModalContainer = styled.div`
    position: fixed;
    width: 30%;
    height: 80%;
    top: 55%;
    left: 50%;
    translate: -50% -50%; /* 중앙에 고정 */
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 1.5rem 2rem 1.5rem 2rem;
    border: 1px solid ${({ theme }) => theme.backgroundColor};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: hidden;
    z-index: 1002;
    transform-origin: center;

    /* 애니메이션 적용 */
    animation: ${fadeIn} 200ms ease-out;

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 55%;
        height: 80%;
        padding: 1.5rem;
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
    background-color: ${({ active, theme }) => (active ? theme.notificationActiveButtonBgColor : theme.notificationButtonBgColor)};
    color: ${({ active, theme }) => (active ? theme.notificationActiveButtonTextColor : theme.notificationButtonTextColor)};
    border: 1px solid ${({ active, theme }) => (active ? theme.notificationActiveButtonBorderColor : theme.notificationButtonBorderColor)};
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
    font-size: 0.8rem;
    font-weight: 700;

    &:hover {
        background-color: ${({ active, theme }) => (active ? theme.notificationActiveButtonHoverBgColor : theme.notificationButtonHoverBgColor)};
    }
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    max-width: 30%;
`;

export const DeleteAllIcon = styled.div`
    position: relative;
    display: flex;
    align-item: center;
    cursor: pointer;
    font-size: 22px;
    color: #888;

    &:hover {
        color: #333;
    }

    &:hover > div {
        display: block;
    }
`;

export const TrashIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    color: ${({ theme }) => theme.notificationTrashIconColor};
    z-index: 1010;
    &:hover {
        color: ${({ theme }) => theme.notificationTrashIconHoverColor};
    }
`;

export const TrashAllIcon = styled(FontAwesomeIcon)`
    cursor: pointer
    color: ${({ theme }) => theme.notificationTrashIconColor};
    z-index: 1010;
    font-size: 1.3rem;

    &:hover {
        color: ${({ theme }) => theme.notificationTrashIconHoverColor};
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 1.2rem;
    }
`

export const Tooltip = styled.div`
    display: none;
    position: absolute;
    background-color: ${({ theme }) => theme.notificationToolTipBackgroundColor};
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    font-size: 12px;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 1020;
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const NotificationIcon = styled.div`
    display: flex;
    align-item: center;
    justify-content: center;
    font-size: 1.3rem;
    width: 25px;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 1.2rem;
    }
`;

export const NotificationList = styled.ul`
    list-style: none;
    padding: 0;
    height: 90%;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.notificationInnerContentBackgroundColor};
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

    @media all and (min-width: 359px) and (max-width: 799px) {
        &::-webkit-scrollbar {
            width: 10px;
        }

        &:hover {
            &::-webkit-scrollbar {
                width: 10px;
            }
        }
    }
`;

export const NotificationItem = styled.li<{ read: boolean; isRemoving: boolean; moveUp: boolean; dragX: number, isActive: boolean }>`
    margin: 0;
    border-top: 1px solid lightgrey;
    color: ${({ read, theme }) => (read ? theme.notificationReadMessageTextColor : theme.notificationUnreadMessageTextColor)};
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
    position: relative;
    overflow: hidden;
    z-index: 1010;
    user-select: none
`;

export const NotificationText = styled.span`
    flex-grow: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 0.9rem;
    }
`;

export const NewBadge = styled.span`
    color: #FA3E3E;
    font-weight: bold;
    margin-right: 5px;
    font-size: 1rem;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 0.9rem;
    }
`;

export const DeletedZone = styled.div<{ opacity: number }>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    padding-right: 20px;
    background-color: #DC143C;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    z-index: 1000;
    opacity: ${props => props.opacity};
    transition: opacity 0.3s ease;

    @media all and (min-width: 359px) and (max-width: 799px) {
        font-size: 0.9rem;
    }
`;

export const ConfirmDialog = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    padding: 20px; 
    border: 1px solid ${({ theme }) => theme.borderColor};
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
    background-color: ${({ theme }) => theme.notificationActiveButtonBgColor};
    color: ${({ theme }) => theme.notificationActiveButtonTextColor};
    border: 1px solid ${({ theme }) => theme.notificationActiveButtonBorderColor};
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: ${({ theme }) => theme.notificationActiveButtonHoverBgColor};
    }
`;

export const CancelButton = styled.button`
    background-color: ${({ theme }) => theme.notificationButtonBgColor};
    color: ${({ theme }) => theme.notificationButtonTextColor};
    border: 1px solid ${({ theme }) => theme.notificationButtonBorderColor};
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: ${({ theme }) => theme.notificationButtonHoverBgColor};
    }
`;