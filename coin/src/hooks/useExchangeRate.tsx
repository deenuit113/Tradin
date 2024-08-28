import { useState, useEffect } from "react";
import { getCurrencyConversionRates } from "../components/units/main/currency/CurrencyConvertAPI";

export function useExchangeRate() {
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [timestamp, setTimestamp] = useState<number | null>(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            const usdToKrwRate = await getCurrencyConversionRates();
            const timestampRate = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
            const currentDate = new Date();  // 현재 시간을 바로 Date 객체로 생성
            setExchangeRate(usdToKrwRate); // 환율 값을 상태로 저장
            setTimestamp(currentDate.getTime());
        };

        fetchExchangeRate(); // 컴포넌트가 마운트될 때 처음 환율 값을 가져옴
        const interval = setInterval(fetchExchangeRate, 60000); // 1분마다 환율 값을 갱신

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 정리
    }, []);

    return { exchangeRate, timestamp };
}