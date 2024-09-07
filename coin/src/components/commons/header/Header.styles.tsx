import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-bottom: 1px solid ${({ theme }) => theme.innerbackgroundColor};
    padding: 0px 0px 0px 0px;
    z-index: 999;
    box-sizing: border-box;
`;

export const Left = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: space-between;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
    }
`;

export const SidebarButtonContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const Title = styled.h1`
    cursor: pointer;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: ${({ theme }) => theme.textColor};

    .logo{
        fill: ${({ theme }) => theme.iconColor};
    }
    #t-bar {
        transition: width 0.2s ease-in-out;
    }
    .logo:hover #t-bar {
        width: 77px;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 15px;
    }
`;

export const Center = styled.div`
    flex: 1;
    text-align: center;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 40%;
        width: 40%;
        margin-left: 20px;
    }
`;

export const Marquee = styled.div`
    border-radius: 10px;
    overflow: hidden;
    white-space: nowrap;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;

    p {
        margin: 0;
        position: absolute;
        animation: slideUp 1s ease-in-out;
        margin: 0;
        position: absolute;
        animation: slideUp 1s ease-in-out;
        color: ${({ theme }) => theme.textColor};
    }

    @keyframes slideUp {
        0% {
            transform: translateY(100%);
            opacity: 0;
            transform: translateY(100%);
            opacity: 0;
        }
        50% {
            transform: translateY(0%);
            opacity: 1;
        50% {
            transform: translateY(0%);
            opacity: 1;
        }
    }
`;

export const Right = styled.div`
    width: 25%;
    width: 25%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: space-between;
    margin-left: 10px;
    padding: 0px;

    align-text: center;
    justify-content: space-between;
    margin-left: 10px;
    padding: 0px 10px 0px 10px;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 30%;
        width: 30%;
        margin-right: 20px;
    }
`;

export const IconList = styled.ul`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-between;

    .DarkMode-Switch{
        &:hover .SunIcon {
            transform: rotate(180deg);
        }
        &:hover .MoonIcon {
            transform: rotate(-30deg);
        }
    }
`;

export const SunIcon = styled(FontAwesomeIcon)`
    transition: transform 0.5s ease;
`;

export const MoonIcon = styled(FontAwesomeIcon)`
    transition: transform 0.3s ease;
`;


export const IconListItem = styled.li`
    display: flex;
    align-items: center;
    width: 30%;
    justify-content: center;

    p {
        color: ${({ theme }) => theme.textColor};
    }
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    padding-top: 10px;

    .Fabars{
        color: ${({ theme }) => theme.iconColor};
    }
`;

export const Login = styled.p`
    font-size: 11px;
    &:hover {
        cursor: pointer;
    }
    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 7px;
    }
`

export const LoginSignUpLabel = styled.p`
    font-size: 11px;
    &:hover {
        cursor: pointer;
    }
    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 7px;
    }
`

export const SignUp = styled.p`
    font-size: 11px;
    &:hover {
        cursor: pointer;
    }
    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 7px;
    }
`