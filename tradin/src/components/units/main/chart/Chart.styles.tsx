import styled from "@emotion/styled";

export const PopupContainer = styled.div`
    position: fixed;
    bottom: 0px;
    right: 0px;
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.iconColor};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    z-index: 1300;
    width: 40vw;
    height: 50vh;

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 70vw;
        height: 60vh;
    }
`;

export const CloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    transition: transform 0.3s ease;
    color: ${({ theme }) => theme.iconColor};
    font-size: 20px;
    position: absolute;
    top: 2.5%;
    right: 7%;
    cursor: pointer;
    z-index: 1500;
    transform-origin: center center;

    &:hover {
        transform: rotate(180deg);
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        display: none;
    }
`;