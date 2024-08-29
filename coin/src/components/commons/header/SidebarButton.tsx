import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ToggleButtonProps {
    onClick: () => void;
    darkMode: boolean;
}

const ToggleButtonContainer = styled.button<{ darkMode: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: auto;
    .stick {
        background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
        width: 24px;
        height: 4px;
        border-radius: 2px;
        transition: all 0.3s;
    }

    .stick + .stick {
        margin-top: 4.8px;
    }

    .stick:nth-child(1) {
        transform-origin: 2px 4px; /* 왼쪽 중간을 중심으로 회전 */
    }

    .stick:nth-child(2) {
        transform-origin: center; /* 중앙을 중심으로 축소 */
    }

    .stick:nth-child(3) {
        transform-origin: 2px 0px; /* 왼쪽 중간을 중심으로 회전 */
    }

    &.close .stick:nth-child(1) {
        transform: rotate(45deg) translate(0px, 0px); /* X 표시를 위한 회전과 이동 */
        width: 27.2px; /* 너비를 조정 */
    }

    &.close .stick:nth-child(2) {
        transform: scaleX(0); /* X축 방향으로 축소 */
    }

    &.close .stick:nth-child(3) {
        transform: rotate(-45deg) translate(0px, 0px); /* X 표시를 위한 회전과 이동 */
        width: 27.2px; /* 너비를 조정 */
    }
`;

export default function SidebarButton (props: ToggleButtonProps): JSX.Element {
    const [isClose, setIsClose] = useState(false);

    const handleClick = () => {
        setIsClose(!isClose);
        props.onClick();
    };

    return (
        <ToggleButtonContainer
            onClick={handleClick}
            className={isClose ? '' : 'close'}
            darkMode={props.darkMode}
        >
            <span className="stick"></span>
            <span className="stick"></span>
            <span className="stick"></span>
        </ToggleButtonContainer>
    );
};