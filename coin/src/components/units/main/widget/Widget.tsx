import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSpring, animated } from "react-spring";
import * as S from "../Main.styles";
import { FaEllipsisV } from "react-icons/fa";
import { availableWidgets } from "./AvailableWidgets";
import { IWidgetProps } from "./Widget.types";
import CryptoWidgetContent from "./CryptoWidgetContent";
import BinanceWidgetContent from "./BinanceWidgetContent";

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


    const widgetConfig = availableWidgets.find(w => w.type === widget.type);

    const renderWidgetContent = () => {
        if (widgetConfig?.category === 'crypto') {
            return <CryptoWidgetContent widget={widget} isCurrencyKRW={isCurrencyKRW} />;
        } else if (widgetConfig?.category === 'data') {
            return <BinanceWidgetContent />;
        } else {
            return <p>Unknown widget category</p>;
        }
    };

    return (
        <animated.div style={springStyle} ref={ref}>
            <S.Widget 
                isDragging={isDragging}
                onClick={() => onClickWidget(widgetConfig?.symbol || '')}
            >
                <S.WidgetHeader>
                    <S.WidgetTitle>{widgetConfig?.name} {widgetConfig?.icon}</S.WidgetTitle>
                    <S.MenuIcon
                        onClick={(e) => {
                            e.stopPropagation(); // 메뉴 아이콘 클릭 시 이벤트 버블링 방지
                            setMenuOpen(index === menuOpen ? null : index);
                        }}
                    >
                        <FaEllipsisV className="MenuIcon" />
                    </S.MenuIcon>
                    {menuOpen === index && (
                        <S.DropdownMenu ref={dropdownRef}>
                            <S.DropdownItem
                                onClick={(e) => {
                                    e.stopPropagation(); // 삭제 클릭 시 이벤트 버블링 방지
                                    removeWidget(index);
                                }}
                            >위젯 삭제</S.DropdownItem>
                        </S.DropdownMenu>
                    )}
                </S.WidgetHeader>
                {renderWidgetContent()}
            </S.Widget>
        </animated.div>
    );
};

export default Widget;