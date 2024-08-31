import styled from "@emotion/styled";

export const Sidebar = styled.div<{ open: boolean }>`
    width: 15%;
    height: 90vh;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    background-color: ${({ theme }) => theme.backgroundColor};
    overflow-y: auto;
    z-index: 999;
    position: fixed;
    top: 10vh;
    left: ${({ open }) => (open ? "0" : "-20%")};
    transition: left 0.3s ease;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
        left: ${({ open }) => (open ? "0" : "-40%")};
        font-size: 12px;
    }
`;

export const Menu = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100%;
`;

export const MenuItem = styled.li<{ index: number, isOpen: boolean }>`
    padding: 1rem;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    padding-left: 2rem;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-20px)')};
    transition: transform 0.3s ease, opacity 0.3s ease;
    transition-delay: ${({ index }) => `${index * 0.1}s`};
`;

export const MenuTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.textColor};
    width: 100%;
    flex: 1;
    padding-left: 1rem;

    p {
        font-weight: 700;
    }
`;

export const Icon = styled.span<{ isOpen: boolean }>`
    display: flex;
    cursor: pointer;
    width: 20%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .FaAngleDown {
        color: ${({ theme }) => theme.iconColor};
        font-size: 1.5rem;
        transition: transform 0.3s ease;
    }

    &:hover .FaAngleDown {
        transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : '')};
    }
`;

export const SubMenu = styled.ul<{ isOpen: boolean }>`
    list-style-type: none;
    padding-left: 10%;
    margin: 0;
    overflow: hidden;
    transition: max-height 1s ease-in-out;
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};

    li {
        padding: 0.5rem;
        color: ${({ theme }) => theme.textColor};

        &:hover {
            background-color: ${({ theme }) => theme.sidebarMenuHoverColor};
        }
    }
`;

export const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    height: 10%;

    &:hover {
        background-color: ${({ theme }) => theme.sidebarMenuHoverColor};
    }
`;