import React, { useEffect, useState } from "react";
import Widget from "./CryptoWidget/CryptoWidget";
import { currencyKRW } from "../../../../util/atoms";
import { useRecoilState } from "recoil";
import { useExchangeRate } from "../../../../hooks/useExchangeRate";
import { 
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@chakra-ui/react";
import * as C from "./styles/components/WidgetSelector.components";

interface WidgetSelectorProps {
    addWidget: (widgetType: string) => void;
    widgetSelectorOpen: boolean;
    availableWidgets: { type: string; name: string; icon: JSX.Element }[];
    onClose: () => void;
}

const WidgetSelector = ({ addWidget, widgetSelectorOpen, availableWidgets, onClose }: WidgetSelectorProps) => {
    const [isCurrencyKRW] = useRecoilState(currencyKRW);

    const { exchangeRate, timestamp } = useExchangeRate();

    return (
        <DrawerRoot placement="bottom" size="sm" open={widgetSelectorOpen} onOpenChange={onClose}>
            <DrawerBackdrop />
            <DrawerContent
                roundedTop="lg"
                opacity="0.9"
                bg="widgetSelectorBackgroundColor"
            >
                <DrawerHeader>
                    <DrawerTitle>위젯 추가</DrawerTitle>
                </DrawerHeader>
                <Separator width="100%" size="sm"/>
                <DrawerBody>
                    <C.SelectorOptionContainer>
                        {availableWidgets.length > 0 ? (
                            availableWidgets.map(widget => (
                                <C.SelectorOption key={`${widget.type}`} onClick={() => addWidget(widget.type)}>
                                    <Widget
                                        widget={{ id: `${widget.type}`, type: widget.type, name: widget.name }} // 고유한 ID 생성
                                        index={0}
                                        removeWidget={() => {}}
                                        moveWidget={() => {}}
                                        onClickWidget={(symbol: string) => {}}
                                        isCurrencyKRW={isCurrencyKRW}
                                    />
                                </C.SelectorOption>
                            ))
                        ) : (
                            <C.NoWidgetMessage>추가할 위젯이 없습니다</C.NoWidgetMessage>
                        )}
                    </C.SelectorOptionContainer>
                </DrawerBody>
                <DrawerCloseTrigger/>
            </DrawerContent>
        </DrawerRoot>
    );
};

export default WidgetSelector;