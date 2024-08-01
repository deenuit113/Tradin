import styled from "@emotion/styled";

export const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 투명도 조절
        zIndex: 990,
    },
    content: {
        top: '50%',
        left: '50%',
        width: '5%',
        height: '1%',
    }
};

export const CloseButton = styled.button<{darkMode: boolean}>`
    position: fixed;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    
    &:hover {
        transform: rotate(180deg);
    }
`;

export const NotificationList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const NotificationItem = styled.li`
    margin: 10px 0;
`;

export const ModalContainer = styled.div<{darkMode: boolean}>`
    position: fixed;
    width: 30%;
    height: 80%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f2f2f2;
    padding: 20px 10px 20px 10px;
    border: 3px solid lightgrey;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: 1002;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ darkMode }) => (darkMode ? '#888' : '#f0f0f0')};
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
        // 모바일 세로
        width: 95%;
        height: 80%;
        padding-left: 10px;
    }
`