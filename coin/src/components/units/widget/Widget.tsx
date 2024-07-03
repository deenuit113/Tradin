import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSpring, animated } from "react-spring";
import * as S from "../main/Main.styles";
import { FaEllipsisV } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms"

const ItemType = "WIDGET";

interface WidgetProps {
    widget: string;
    index: number;
    menuOpen: number | null;
    setMenuOpen: (index: number | null) => void;
    removeWidget: (index: number) => void;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
}

const Widget = ({
    widget,
    index,
    menuOpen,
    setMenuOpen,
    removeWidget,
    moveWidget,
}: WidgetProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

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
        opacity: isDragging? 0.5 : 1,
        config: { tension: 250, friction: 20 }
    });

    return (
        <animated.div style={springStyle} ref={ref}>
            <S.Widget isDragging={isDragging} darkMode={isDarkMode}>
                <S.WidgetHeader darkMode={isDarkMode}>
                    {widget}
                    <S.MenuIcon
                        onClick={() => setMenuOpen(index === menuOpen ? null : index)}
                        darkMode={isDarkMode}
                    >
                        <FaEllipsisV className="MenuIcon"/>
                    </S.MenuIcon>
                    {menuOpen === index && (
                        <S.DropdownMenu darkMode={isDarkMode}>
                            <S.DropdownItem
                                onClick={() => removeWidget(index)}
                                darkMode={isDarkMode}
                            >위젯 삭제</S.DropdownItem>
                        </S.DropdownMenu>
                    )}
                </S.WidgetHeader>
                <S.WidgetContent darkMode={isDarkMode}>{widget} 내용</S.WidgetContent>
            </S.Widget>
        </animated.div>
    );
};

export default Widget;