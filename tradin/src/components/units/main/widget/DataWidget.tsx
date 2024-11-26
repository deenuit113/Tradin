import React from "react";
import * as C from "./styles/components/CryptoWidget.components";
import DataWidgetContent from "./DataWidget/DataWidgetContent";

interface IDataWidgetProps {
    widget: {
        type: string;
        name: string;
        icon?: JSX.Element; // 아이콘은 선택적 속성으로 처리
    };
}

const DataWidget = ({ widget }: IDataWidgetProps): JSX.Element => {
    return (
        <C.Widget>
            <C.WidgetHeader>
                <C.WidgetTitle>
                    {widget.icon}&nbsp;{widget.name}
                </C.WidgetTitle>
            </C.WidgetHeader>
            <DataWidgetContent type={widget.type}/>
        </C.Widget>
    );
};

export default DataWidget;