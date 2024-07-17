import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSpring, animated } from "react-spring";
import * as S from "../main/Main.styles";
import { FaEllipsisV, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";
import CryptoWidget from "./CryptoWidget";
import { availableWidgets } from "./AvailableWidgets";

const ItemType = "WIDGET";

interface WidgetProps {
    widget: { id: string; type: string; name: string };
    index: number;
    menuOpen: number | null;
    setMenuOpen: (index: number | null) => void;
    removeWidget: (index: number) => void;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
    onClickWidget: (symbol: string) => void;
}

const Widget = ({
    widget,
    index,
    menuOpen,
    setMenuOpen,
    removeWidget,
    moveWidget,
    onClickWidget,
}: WidgetProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [priceData, setPriceData] = useState<{ price: number | null; prevPrice: number | null; timestamp: string | null }>({
        price: null,
        prevPrice: null,
        timestamp: null,
    });
    const [isDarkMode] = useRecoilState(darkMode);

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item: { index: number }, monitor: any) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            moveWidget(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const springStyle = useSpring({
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        opacity: isDragging ? 0.5 : 1,
        config: { tension: 250, friction: 20 }
    });

    const getIcon = () => {
        if (priceData.prevPrice === null || priceData.price === null) return null;
        if (priceData.price > priceData.prevPrice) return <FaCaretUp color="red" />;
        if (priceData.price < priceData.prevPrice) return <FaCaretDown color="blue" />;
        return <span>-</span>; // 전의 가격과 같을 때
    };

    const widgetConfig = availableWidgets.find(w => w.type === widget.type);

    return (
        <animated.div style={springStyle} ref={ref} onClick={() => onClickWidget(widgetConfig?.symbol || '')}>
            <S.Widget isDragging={isDragging} $darkMode={isDarkMode}>
                <S.WidgetHeader $darkMode={isDarkMode}>
                    {widgetConfig?.name} {widgetConfig?.icon}
                    <S.MenuIcon
                        onClick={() => setMenuOpen(index === menuOpen ? null : index)}
                        $darkMode={isDarkMode}
                    >
                        <FaEllipsisV className="MenuIcon" />
                    </S.MenuIcon>
                    {menuOpen === index && (
                        <S.DropdownMenu $darkMode={isDarkMode}>
                            <S.DropdownItem
                                onClick={() => removeWidget(index)}
                                $darkMode={isDarkMode}
                            >위젯 삭제</S.DropdownItem>
                        </S.DropdownMenu>
                    )}
                </S.WidgetHeader>
                <S.WidgetContent $darkMode={isDarkMode}>
                    <p>가격: {priceData.price ? `${priceData.price} KRW` : '로딩 중...'}</p>
                    {getIcon()}
                    {priceData.timestamp && <S.CoinTimeStamp>{priceData.timestamp} 기준</S.CoinTimeStamp>}
                </S.WidgetContent>
                {widget.type && <CryptoWidget coinId={widget.type} setPriceData={setPriceData} />}
            </S.Widget>
        </animated.div>
    );
};

export default Widget;