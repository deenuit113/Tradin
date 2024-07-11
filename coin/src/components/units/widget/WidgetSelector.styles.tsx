import styled from "styled-components";

export const SelectorContainer = styled.div`
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    position: absolute;
    bottom: 60px;
    left: 20px;
    z-index: 10;
`;

export const SelectorHeader = styled.h4`
    margin: 0;
    margin-bottom: 8px;
`;

export const WidgetOption = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
    svg {
        margin-right: 8px;
    }
`;