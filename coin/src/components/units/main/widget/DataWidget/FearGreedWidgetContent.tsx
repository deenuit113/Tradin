import React, { useEffect, useState } from "react";
import { useFearGreedIndex } from "../../../../../hooks/useFearGreedIndex";
import styled from "@emotion/styled";
import * as S from "../../Main.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ProgressBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
`;

const SvgContainer = styled.svg`
    transform: rotate(-90deg); /* 시작점을 12시 방향으로 설정 */
    position: relative; /* 상대 위치로 설정하여 내부 요소의 절대 위치를 설정할 수 있게 함 */
    z-index: 1;
`;

const BackgroundCircle = styled.circle`
    stroke: lightgrey;
    stroke-width: 11;
    fill: none;
    z-index: 998;
`;

const ForegroundCircle = styled.circle<{ circumference: number; offset: number, hovered: boolean }>`
    stroke: #4169E1;
    stroke-width: ${({ hovered }) => hovered ? 15 : 10};
    fill: none;
    stroke-dasharray: ${({ circumference }) => circumference};
    stroke-dashoffset: ${({ offset }) => offset};
    transition: stroke-dashoffset 0.4s ease-out; stroke-width 0.4s ease-out;
    z-index: 999;
`;

const ProgressText = styled.p<{ hovered: boolean }>`
    position: absolute;
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textColor};
    z-index: 1000;
    opacity: ${({ hovered }) => hovered ? 1 : 0};
    transition: opacity 0.4s ease-out;
`;

const FearGreedWidgetContent: React.FC = () => {
    const { data, loading, error } = useFearGreedIndex();
    const [offset, setOffset] = useState(0);
    const [circumference, setCircumference] = useState(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const radius = 40;
        const calculatedCircumference = 2 * Math.PI * radius;
        setCircumference(calculatedCircumference);

        if (data?.fearGreedIndex !== undefined) {
            const value = data.fearGreedIndex;
            const strokeValue = (value / 100) * calculatedCircumference;

            // 애니메이션 시작 전에 미리 초기화하지 않고 직접 애니메이션을 적용
            requestAnimationFrame(() => {
                setOffset(calculatedCircumference - strokeValue);
            });
        }
    }, [data]);

    if (loading) return <S.WidgetContent><FontAwesomeIcon id="LoadingIcon" icon={faSpinner} spin /></S.WidgetContent>;
    if (error) return <p>Error: {error}</p>;

    return (
        <S.WidgetContent>
            <ProgressBarContainer>
                <SvgContainer 
                    xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <BackgroundCircle
                        cx="50"
                        cy="50"
                        r="40"
                    />
                    <ForegroundCircle
                        cx="50"
                        cy="50"
                        r="40"
                        circumference={circumference}
                        offset={offset}
                        hovered={hovered}
                    />
                    
                </SvgContainer>
                <ProgressText hovered={hovered}>{data?.fearGreedIndex}</ProgressText>
                
            </ProgressBarContainer>
        </S.WidgetContent>
        
    );
};

export default FearGreedWidgetContent;
