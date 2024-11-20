import React from "react";
import LongShortRatioWidgetContent from "./LongShortRatioWidgetContent";
import FearGreedWidgetContent from "./FearGreedWidgetContent";
import RSIWidgetContent from "./BTCRSIWidgetContent";
import { DataWidgetProps } from "../Widget.types";

const DataWidgetContent: React.FC<DataWidgetProps> = ({ type }) => {
    const renderWidget = () => {
        switch (type) {
            case 'longshortratio':
                return <LongShortRatioWidgetContent />;
            case 'feargreedindex':
                return <FearGreedWidgetContent/>;
            case 'btcrsiindex':
                return <RSIWidgetContent/>;
            default:
                return <p>Unknown widget type</p>;
        }
    };

    return (
        <>
        {renderWidget()}
        </>
    );
};

export default DataWidgetContent;