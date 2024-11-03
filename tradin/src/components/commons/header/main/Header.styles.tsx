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

    .Title-SVP {
        font-size: 20px;
        display: none;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        .logo {
            display: none;
        }

        .Title-SVP {
            display: inline-block;
        }
    }
`;

export const Center = styled.div`
    flex: 1;
    text-align: center;

    @media all and (min-width:359px) and (max-width: 799px) {
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
    width: 20%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: flex-end;
    margin-left: 10px;
    padding: 0px 10px 0px 10px;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 35%;
    }
`;

export const IconList = styled.ul`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: flex-end;
    gap: 2rem;

    .DarkMode-Switch{
        &:hover .SunIcon {
            transform: rotate(180deg);
        }
        &:hover .MoonIcon {
            transform: rotate(-30deg);
        }
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        gap: 1.5rem;
        .DarkMode-Switch{
            scale: 0.8;
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
    justify-content: center;
    margin-right: 10px;

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

export const SignInUpContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0px 10px;
    &:hover {
        cursor: pointer;
    }
`

export const SignInUp = styled.p`
    font-size: 11px;
    font-weight: 700;

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 10px;
    }
`

export const UserProfile = styled.div`
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .userIcon {
        font-size: 20px;
    }

    &:hover {
        .userDropDown {
            display: flex;
            opacity: 1;
            transition-duration: 1s;
        }
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 30px;
        height: 30px;
    }
`

export const UserImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

export const UserDropDown = styled.div`
    position: absolute;
    display: none;
    flex-direction: column;
    gap: 5px;
    top: 50px;
    right: 10px;
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    width: 120px;
    opacity: 0;
    z-index: 1250;

    &:hover {
        opacity: 1;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
    }
`

export const UserDropDownItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px;
    padding: 5px 10px;

    &:hover {
        background-color: ${({ theme }) => theme.sidebarMenuHoverColor};
    }
    &:not(:last-child) {
        border-bottom: ${({ theme }) => theme.borderColor};
    }
`