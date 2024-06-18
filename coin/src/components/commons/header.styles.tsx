import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    padding: 0 2rem;
    background-color: #f8f9fa;
`;

export const Left = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
`;

export const Title = styled.h1`
    cursor: pointer;
    margin-right: 2rem;
`;

export const Center = styled.div`
    width: 60%;
    text-align: center;
`;

export const Marquee = styled.div`
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
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const IconListItem = styled.li`
    margin: 0 0.5rem;
`;