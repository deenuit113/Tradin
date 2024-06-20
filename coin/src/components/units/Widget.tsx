import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import * as S from "./Main.styles";
import { FaEllipsisV } from "react-icons/fa";

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

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <S.Widget ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <S.WidgetHeader>
                {widget}
                <S.MenuIcon onClick={() => setMenuOpen(index === menuOpen ? null : index)}>
                    <FaEllipsisV />
                </S.MenuIcon>
                {menuOpen === index && (
                    <S.DropdownMenu>
                        <S.DropdownItem onClick={() => removeWidget(index)}>위젯 삭제</S.DropdownItem>
                    </S.DropdownMenu>
                )}
            </S.WidgetHeader>
            <S.WidgetContent>
                {widget} 내용
            </S.WidgetContent>
        </S.Widget>
    );
}

export default Widget;