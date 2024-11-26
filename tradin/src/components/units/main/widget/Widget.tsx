import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSpring, animated } from "react-spring";
import { FaEllipsisV } from "react-icons/fa";
import { cryptoWidgets } from "./AvailableWidgets";
import { IWidgetProps } from "./Widget.types";
import CryptoWidgetContent from "./CryptoWidget/CryptoWidgetContent";
import DataWidgetContent from "./DataWidget/DataWidgetContent";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import * as C from "./styles/components/Widget.components";

const ItemType = "WIDGET";

const Widget = ({
    widget,
    index,
    removeWidget,
    moveWidget,
    onClickWidget,
    isCurrencyKRW,
}: IWidgetProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const widgetConfig = cryptoWidgets.find(w => w.type === widget.type);

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
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

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
    

    return (
        <animated.div style={springStyle} ref={ref}>
            <C.Widget 
                isDragging={isDragging}
            >
                <C.WidgetHeader>
                    <C.WidgetTitle>{widgetConfig?.name}&nbsp;{widgetConfig?.icon}</C.WidgetTitle>
                    <MenuRoot>
                        <MenuTrigger asChild onClick={(e)=> e.stopPropagation()} >
                            <C.WidgetDropDownBtn size="xs" variant="ghost" rounded="xl">
                                <FaEllipsisV />
                            </C.WidgetDropDownBtn>
                        </MenuTrigger>
                        <MenuContent>
                            {
                                widgetConfig?.symbol && (
                                    <MenuItem value="coin-chart" onClick={() => onClickWidget(widgetConfig.symbol)}>
                                        Chart
                                    </MenuItem>
                                )
                            }
                            <MenuItem 
                                value="delete"
                                color="fg.error"
                                _hover={{ bg: "bg.error", color: "fg.error" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeWidget(index)
                                }}
                            >
                                Delete ...
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </C.WidgetHeader>
                <CryptoWidgetContent widget={widget} isCurrencyKRW={isCurrencyKRW} />
            </C.Widget>
        </animated.div>
    );
};

export default Widget;