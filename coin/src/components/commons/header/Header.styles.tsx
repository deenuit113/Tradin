import styled from "@emotion/styled";

export const HeaderContainer = styled.header<{ darkMode: boolean }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    border-bottom: 1px solid lightgrey;
    padding: 10px 0px 10px 0px;
    z-index: 999;
    box-sizing: border-box;
`;

export const Left = styled.div`
    width: 15%;
    width: 15%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: space-between;
    padding-left: 15px;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
    }

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
    }
`;

export const Title = styled.h1<{ darkMode: boolean }>`
    cursor: pointer;
    font-size: 25px;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 15px;
    }
`;

export const Center = styled.div`
    width: 60%;
    text-align: center;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 40%;
        width: 40%;
        margin-left: 20px;
    }
`;

export const Marquee = styled.div<{ darkMode: boolean }>`
    border-radius: 10px;
    box-shadow: 0px 0px 10px gray;
    overflow: hidden;
    white-space: nowrap;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
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
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }

    @keyframes slideUp {
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

export const IconList = styled.ul<{ darkMode: boolean }>`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    justify-content: space-between;

    .DarkMode-Switch{
        &:hover{
            box-shadow: ${({ darkMode }) => (darkMode ? '0px 0px 10px blue' : '0px 0px 10px lightblue')};
        }
    }

    .Notification-Switch {
        &:hover {
            filter: drop-shadow(${({ darkMode }) => (darkMode ? '0px 0px 5px black' : '0px 0px 5px white')});
            box-shadow: ${({ darkMode }) => (darkMode ? '0px 0px 10px blue' : '0px 0px 10px lightblue')};
        }
    }

    .Notification-Switch {
        &:hover {
            filter: drop-shadow(${({ darkMode }) => (darkMode ? '0px 0px 5px black' : '0px 0px 5px white')});
        }
    }
`;

export const IconListItem = styled.li<{ darkMode: boolean }>`
    display: flex;
    align-items: center;
    width: 30%;
    justify-content: center;

    p {
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }

    p {
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }
`;

export const ToggleButton = styled.button<{ darkMode: boolean }>`
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    padding-top: 10px;

    .Fabars{
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
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