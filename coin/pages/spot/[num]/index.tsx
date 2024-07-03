import { useRouter } from 'next/router';
import * as S from "../../../src/components/units/item/Item.styles";
import { useSidebar } from "../../../src/components/commons/sidebar/SidebarContext";
import SideBar from "../../../src/components/commons/sidebar/Sidebar";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../src/components/commons/atoms";

export default function SpotDetail(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);
    const router = useRouter();
    const { num } = router.query;

    const transactions = [
        { id: 1, type: "매수", date: "2024-06-01", price: "1000 KRW", yield: "10.00%", cumYield: "50.00%" },
        { id: 1, type: "매도", date: "2024-06-02", price: "1050 KRW", yield: "", cumYield: "" },
        { id: 2, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 2, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 3, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 3, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 4, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 4, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 5, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 5, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 6, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 6, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 7, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 7, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        { id: 8, type: "매수", date: "2024-06-03", price: "2000 KRW", yield: "20.00%", cumYield: "70.00%" },
        { id: 8, type: "매도", date: "2024-06-04", price: "2100 KRW", yield: "", cumYield: "" },
        // Add more transactions as needed
    ];

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.SpotHeader darkMode={isDarkMode}>현물 {num}</S.SpotHeader>
                <S.WidgetContainer darkMode={isDarkMode}>
                    <S.WidgetHeader darkMode={isDarkMode}>현물 {num}</S.WidgetHeader>
                    <S.WidgetTable darkMode={isDarkMode}>
                        <thead>
                            <tr>
                                <S.WidgetCell className="title">코인</S.WidgetCell>
                                <S.WidgetCell className="title">현재 포지션</S.WidgetCell>
                                <S.WidgetCell className="title">진입가격</S.WidgetCell>
                                <S.WidgetCell className="title">누적손익</S.WidgetCell>
                                <S.WidgetCell className="title">승률</S.WidgetCell>
                                <S.WidgetCell className="title">수익 팩터</S.WidgetCell>
                                <S.WidgetCell className="title">횟수</S.WidgetCell>
                                <S.WidgetCell className="title">평균봉수</S.WidgetCell>
                                <S.WidgetCell className="title">평균수익</S.WidgetCell>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <S.WidgetCell className="value">코인아이콘</S.WidgetCell>
                                <S.WidgetCell className="value">상승</S.WidgetCell>
                                <S.WidgetCell className="value">1000 KRW</S.WidgetCell>
                                <S.WidgetCell className="value">10.00%</S.WidgetCell>
                                <S.WidgetCell className="value">50.00%</S.WidgetCell>
                                <S.WidgetCell className="value">1.234</S.WidgetCell>
                                <S.WidgetCell className="value">5</S.WidgetCell>
                                <S.WidgetCell className="value">10</S.WidgetCell>
                                <S.WidgetCell className="value">5.00%</S.WidgetCell>
                            </tr>
                        </tbody>
                    </S.WidgetTable>
                    <S.HorizontalDivider />
                    <S.TransactionHistory darkMode={isDarkMode}>
                        <thead>
                            <tr>
                                <S.WidgetCell className="title">ID</S.WidgetCell>
                                <S.WidgetCell className="title">매매타입</S.WidgetCell>
                                <S.WidgetCell className="title">날짜</S.WidgetCell>
                                <S.WidgetCell className="title">가격</S.WidgetCell>
                                <S.WidgetCell className="title">수익률</S.WidgetCell>
                                <S.WidgetCell className="title">누적수익률</S.WidgetCell>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    {idx % 2 === 0 ? (
                                        <>
                                            <S.WidgetCell className="value bordered" rowSpan={2}>{transaction.id}</S.WidgetCell>
                                            <S.WidgetCell className="value">{transaction.type}</S.WidgetCell>
                                            <S.WidgetCell className="value">{transaction.date}</S.WidgetCell>
                                            <S.WidgetCell className="value">{transaction.price}</S.WidgetCell>
                                            <S.WidgetCell className="value bordered" rowSpan={2}>{transaction.yield}</S.WidgetCell>
                                            <S.WidgetCell className="value bordered" rowSpan={2}>{transaction.cumYield}</S.WidgetCell>
                                        </>
                                    ) : (
                                        <>
                                            <S.WidgetCell className="value">{transaction.type}</S.WidgetCell>
                                            <S.WidgetCell className="value">{transaction.date}</S.WidgetCell>
                                            <S.WidgetCell className="value">{transaction.price}</S.WidgetCell>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </S.TransactionHistory>
                </S.WidgetContainer>
            </S.MainContent>
        </S.Container>
    );
}