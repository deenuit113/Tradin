import React from "react";
import LongShortRatioWidgetContent from "./LongShortRatioWidgetContent";
import FearGreedWidgetContent from "./FearGreedWidgetContent";

interface DataWidgetContentProps {
    type: string;
}

const DataWidgetContent: React.FC<DataWidgetContentProps> = ({ type }) => {
    const renderWidget = () => {
        switch (type) {
            case 'longshortratio':
                return <LongShortRatioWidgetContent />;
            case 'feargreedindex':
                return <FearGreedWidgetContent />;
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