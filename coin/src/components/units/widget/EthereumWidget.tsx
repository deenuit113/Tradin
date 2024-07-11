import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import * as S from "../main/Main.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";

export default function EthereumWidget() {
    const [price, setPrice] = useState<number | null>(null);
    const [prevPrice, setPrevPrice] = useState<number | null>(null);
    const [isDarkMode] = useRecoilState(darkMode);

    useEffect(() => {
        const fetchEthereumPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=Ethereum&vs_currencies=krw'
                );
                setPrevPrice(price);
                setPrice(response.data.ethereum.krw);
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
            }
        };

        fetchEthereumPrice();
        const intervalId = setInterval(fetchEthereumPrice, 60000); // 1분마다 가격 업데이트

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [price]);

    const getIcon = () => {
        if (prevPrice === null || price === null) return null;
        return price > prevPrice ? <FaCaretUp color="red" /> : <FaCaretDown color="blue" />;
    };

    return (
        <S.Widget isDragging={false} darkMode={isDarkMode}>
            <S.WidgetHeader darkMode={isDarkMode}>
                이더리움 가격
            </S.WidgetHeader>
            <S.WidgetContent darkMode={isDarkMode}>
                <p>가격: {price ? `${price} KRW` : '로딩 중...'}</p>
                {getIcon()}
            </S.WidgetContent>
        </S.Widget>
    );
}