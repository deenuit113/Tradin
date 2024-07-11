import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import * as S from "../main/Main.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";

export default function BitcoinWidget() {
    const [price, setPrice] = useState<number | null>(null);
    const [prevPrice, setPrevPrice] = useState<number | null>(null);
    const [isDarkMode] = useRecoilState(darkMode);

    useEffect(() => {
        const fetchBitcoinPrice = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
                );
                setPrevPrice(price);
                setPrice(response.data.bitcoin.usd);
            } catch (error) {
                console.error('Error fetching Bitcoin price:', error);
            }
        };

        fetchBitcoinPrice();
        const intervalId = setInterval(fetchBitcoinPrice, 60000); // 1분마다 가격 업데이트

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [price]);

    const getIcon = () => {
        if (prevPrice === null || price === null) return null;
        return price > prevPrice ? <FaCaretUp color="red" /> : <FaCaretDown color="blue" />;
    };

    return (
        <S.Widget isDragging={false} darkMode={isDarkMode}>
            <S.WidgetHeader darkMode={isDarkMode}>
                비트코인 가격
            </S.WidgetHeader>
            <S.WidgetContent darkMode={isDarkMode}>
                <p>가격: {price ? `${price} USD` : '로딩 중...'}</p>
                {getIcon()}
            </S.WidgetContent>
        </S.Widget>
    );
}