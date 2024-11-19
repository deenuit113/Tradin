export interface IWidgetProps {
    widget: { id: string; type: string; name: string };
    index: number;
    menuOpen: number | null;
    setMenuOpen: (index: number | null) => void;
    removeWidget: (index: number) => void;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
    onClickWidget: (symbol: string) => void;
    isCurrencyKRW: boolean;
    exchangeRate: number | null;
}

export interface ICryptoWidgetProps {
    widget: any;
    isCurrencyKRW: boolean;
    widgetIcon: JSX.Element;
}

export interface DataWidgetProps {
    type: string;
    title: string;
}

// BTC 롱숏 비율 데이터 위젯 롱비율 props
export interface LongRatioBarProps {
    long: number;
    children?: React.ReactNode;
}
// BTC 롱숏 비율 데이터 위젯 숏비율 props
export interface ShortRatioBarProps {
    short: number;
    children?: React.ReactNode;
}