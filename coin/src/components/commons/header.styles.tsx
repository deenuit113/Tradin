import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: #f8f9fa;
    padding-left: 5%;
    padding-right: 5%;
    box-shadow: 0px 0px 10px gray;
    border-radius: 10px 10px 10px 10px;
    z-index: 1001;
`;

export const Left = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: center;
`;

export const Title = styled.h1`
    cursor: pointer;
    font-size: 25px;
`;

export const Center = styled.div`
    width: 60%;
    text-align: center;
`;

export const Marquee = styled.div`
    border-radius: 10px;
    box-shadow: 0px 0px 10px gray;
    overflow: hidden;
    white-space: nowrap;

    p {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 15s linear infinite;
    }

    @keyframes marquee {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(-100%, 0);
        }
    }
`;

export const Right = styled.div`
    width: 16%;
    display: flex;
    align-items: center;
`;

export const IconList = styled.ul`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const IconListItem = styled.li`
    width: 50%;
    margin: 0 0.5rem;
`;

export const ToggleButton = styled.button`
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    margin-right: 1rem;
    padding-top: 10px;
`;