import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import * as S from "../../Main.styles";
import { useBinanceLongShortRatio } from "../../../../../hooks/useLongShortRatioData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const RatioBarContainer = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    padding: 0px 10px 0px 10px;
`;

export const LongRatioBar = styled.div<{ width: number }>`
    background: linear-gradient(-45deg, #ff4b4b, #ff6f6f, #ff4b4b);
    background-size: 400% 400%;
    animation: colorChange 3s ease infinite, fillLongBar 0.6s ease 0.3s forwards;
    width: ${({ width }) => width}%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding-left: 15px;
    left: 0;
    border-radius: 10px 0px 0px 10px;


    @keyframes fillLongBar {
        from {
            width: 0;
        }
        to {
            width: ${({ width }) => width}%;
        }
    }

    @keyframes colorChange {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

export const ShortRatioBar = styled.div<{ width: number }>`
    background: linear-gradient(-45deg, #4b4bff, #6f6fff, #4b4bff);
    background-size: 400% 400%;
    animation: colorChange 3s ease infinite, fillShortBar 0.6s ease 0.3s forwards;
    width: ${({ width }) => width}%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding-right: 15px;
    margin-left: auto;
    border-radius: 0px 10px 10px 0px;

    @keyframes fillShortBar {
        from {
            width: 0;
        }
        to {
            width: ${({ width }) => width}%;
        }
    }

    @keyframes colorChange {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;

const LongShortRatioWidgetContent: React.FC = () => {
    const { data, loading, error } = useBinanceLongShortRatio("BTCUSDT");
    const [longRatio, setLongRatio] = useState(0);
    const [shortRatio, setShortRatio] = useState(0);
    const [hovered, setHovered] = useState(false);
    
    useEffect(() => {
        // 로컬스토리지에서 데이터 가져오기
        const storedData = localStorage.getItem("binanceLongShortRatio");
        if (storedData) {
            const { longRatio, shortRatio } = JSON.parse(storedData);
            setLongRatio(longRatio);
            setShortRatio(shortRatio);
        }
    }, []);

    useEffect(() => {
        if (data) {
            const newLongRatio = Number(data.longAccount) * 100;
            const newShortRatio = Number(data.shortAccount) * 100;

            // 애니메이션을 위한 상태 업데이트
            setLongRatio(newLongRatio);
            setShortRatio(newShortRatio);

            // 로컬스토리지에 데이터 저장
            localStorage.setItem(
                "binanceLongShortRatio",
                JSON.stringify({
                    longRatio: newLongRatio,
                    shortRatio: newShortRatio,
                    timestamp: data.timestamp,
                })
            );
        }
    }, [data]);

    if (loading) return <S.WidgetContent><FontAwesomeIcon id="LoadingIcon" icon={faSpinner} spin /></S.WidgetContent>;
    if (error) return <p>Error: {error}</p>;

    return (
        <S.WidgetContent>
            <RatioBarContainer
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <LongRatioBar width={longRatio}>
                    {hovered ? `${longRatio.toFixed(2)}%` : "Long"}
                </LongRatioBar>
                <ShortRatioBar width={shortRatio}>
                    {hovered ? `${shortRatio.toFixed(2)}%` : "Short"}
                </ShortRatioBar>
            </RatioBarContainer>
            <S.CoinTimeStamp>
                {data?.timestamp || JSON.parse(localStorage.getItem('binanceLongShortRatio') || '{}').timestamp} 기준
            </S.CoinTimeStamp>
        </S.WidgetContent>
    );
}

export default LongShortRatioWidgetContent;