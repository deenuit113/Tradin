import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSpring, animated } from "react-spring";
import * as S from "../Main.styles";
import { FaEllipsisV, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../commons/atoms";
import CryptoWidget from "./CryptoWidget";
import { availableWidgets } from "./AvailableWidgets";
import { IWidgetProps } from "./Widget.types";

const ItemType = "WIDGET";

const Widget = ({
    widget,
    index,
    menuOpen,
    setMenuOpen,
    removeWidget,
    moveWidget,
    onClickWidget,
    isCurrencyKRW,
    exchangeRate,
}: IWidgetProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [priceData, setPriceData] = useState<{ price: number | null; prevPrice: number | null; timestamp: string | null }>({
        price: null,
        prevPrice: null,
        timestamp: null,
    });
    const [isDarkMode] = useRecoilState(darkMode);
    const [priceChangeIcon, setPriceChangeIcon] = useState<JSX.Element | null>(null);
    const [priceChangePercentage, setPriceChangePercentage] = useState<string | null>(null);
    const [lastChangeTimestamp, setLastChangeTimestamp] = useState<string | null>(null);

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

    useEffect(() => {
        if (priceData.prevPrice !== null && priceData.price !== null) {
            if (priceData.price !== priceData.prevPrice) {
                const priceChange = ((priceData.price - priceData.prevPrice) / priceData.prevPrice) * 100;
                const formattedChange = priceChange.toFixed(2) + "%";

                if (priceData.price > priceData.prevPrice) {
                    setPriceChangeIcon(<FaCaretUp color="red" />);
                    setPriceChangePercentage(`+${formattedChange}`);
                } else if (priceData.price < priceData.prevPrice) {
                    setPriceChangeIcon(<FaCaretDown color="blue" />);
                    setPriceChangePercentage(formattedChange);
                }

                setLastChangeTimestamp(priceData.timestamp);
            }
        }
    }, [priceData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(null);  // dropdownMenu 외부를 클릭하면 닫음
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setMenuOpen]);

    const exchangePrice = () => {
        if (priceData?.price !== null && exchangeRate !== null) {
            return (priceData.price / exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return null;
    };

    const widgetConfig = availableWidgets.find(w => w.type === widget.type);

    return (
        <animated.div style={springStyle} ref={ref}>

            {/* onClick 이벤트 핸들러를 S.Widget 내부로 이동 */}
            <S.Widget 
                isDragging={isDragging} 
                $darkMode={isDarkMode}
                onClick={() => onClickWidget(widgetConfig?.symbol || '')}
            >
                <S.WidgetHeader $darkMode={isDarkMode}>
                    {widgetConfig?.name} {widgetConfig?.icon}
                    <S.MenuIcon
                        onClick={(e) => {
                            e.stopPropagation(); // 메뉴 아이콘 클릭 시 이벤트 버블링 방지
                            setMenuOpen(index === menuOpen ? null : index);
                        }}
                        $darkMode={isDarkMode}
                    >
                        <FaEllipsisV className="MenuIcon" />
                    </S.MenuIcon>
                    {menuOpen === index && (
                        <S.DropdownMenu ref={dropdownRef} $darkMode={isDarkMode}>
                            <S.DropdownItem
                                onClick={(e) => {
                                    e.stopPropagation(); // 삭제 클릭 시 이벤트 버블링 방지
                                    removeWidget(index);
                                }}
                                $darkMode={isDarkMode}
                            >위젯 삭제</S.DropdownItem>
                        </S.DropdownMenu>
                    )}
                </S.WidgetHeader>
                <S.WidgetContent $darkMode={isDarkMode}>
                    {isCurrencyKRW ?
                    <p>가격: {priceData.price ? `${priceData.price.toLocaleString()} KRW` : '로딩 중...'}</p>
                    : <p>가격: {priceData.price ? `${exchangePrice()} USD` : '로딩 중...'}</p>
                    }
                    
                    {priceChangeIcon && (
                        <span
                            style={{
                                color: priceChangeIcon.props.color,
                                marginLeft: "8px",
                            }}
                        >
                            {priceChangeIcon} {priceChangePercentage}
                        </span>
                    )}
                    {lastChangeTimestamp && (
                        <S.CoinTimeStamp>
                            {lastChangeTimestamp} 기준
                        </S.CoinTimeStamp>
                    )}
                </S.WidgetContent>
                {widget.type && <CryptoWidget coinId={widget.type} setPriceData={setPriceData} />}
            </S.Widget>
        </animated.div>
    );
};

export default Widget;