import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    height: 90vh;
`;

export const Sidebar = styled.div`
    width: 15%;
    background-color: #f0f0f0;
    overflow-y: auto;
    border: 3px solid blue;
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
`;

export const SubMenu = styled.ul`
    list-style-type: none;
    padding-left: 1rem;
    margin: 0;
    display: none;

    ${MenuItem}:hover & {
        display: block;
    }

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