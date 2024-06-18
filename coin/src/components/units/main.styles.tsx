import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    height: 90vh;
`;

export const Sidebar = styled.div`
    width: 15%;
    box-shadow: 7px 10px 20px gray;
    border-radius: 0px 10px 10px 0px;
    background-color: #f0f0f0;
    overflow-y: auto;
    z-index: 1000;
`;

export const Menu = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const MenuItem = styled.li`
    padding: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }

    &:hover ul {
        display: block;
    }
`;

export const SubMenu = styled.ul`
    list-style-type: none;
    padding-left: 1rem;
    margin: 0;
    display: none;

    li {
        padding: 0.5rem;
    }
`;

export const MainContent = styled.div`
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;