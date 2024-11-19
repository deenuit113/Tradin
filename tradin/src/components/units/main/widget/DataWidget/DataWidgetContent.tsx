import React from "react";
import LongShortRatioWidgetContent from "./LongShortRatioWidgetContent";
import FearGreedWidgetContent from "./FearGreedWidgetContent";
import RSIWidgetContent from "./BTCRSIWidgetContent";
import { DataWidgetProps } from "../Widget.types";

const DataWidgetContent: React.FC<DataWidgetProps> = ({ type, title }) => {
    const renderWidget = () => {
        switch (type) {
            case 'longshortratio':
                return <LongShortRatioWidgetContent title={title} />;
            case 'feargreedindex':
                return <FearGreedWidgetContent title={title}/>;
            case 'btcrsiindex':
                return <RSIWidgetContent title={title}/>;
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