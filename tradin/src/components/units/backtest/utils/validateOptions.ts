import { StrategyKey } from "../mockdata/MockStrategy";

export const validateMarketType = (marketType: string | null): boolean => {
    return !!marketType;
};

export const validateStrategies = (selectedStrategies: StrategyKey[]): boolean => {
    return selectedStrategies.length > 0;
};

export const validatePosition = (marketType: string | null, position: string): boolean => {
    // 포지션이 존재하는지 확인
    if (!position) return false;
    // 시장 유형이 '현물'일 때 'short' 포지션이 유효하지 않도록 설정
    if (marketType === '현물' && position === 'short') return false;

    return true;
};

export const validateDateRange = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return false;
    return new Date(endDate) >= new Date(startDate);
};

export const validateAllOptions = (
    marketType: string | null,
    selectedStrategies: StrategyKey[],
    position: string,
    startDate: string,
    endDate: string
    ) => {
        const typeError = !validateMarketType(marketType);
        const strategyError = !validateStrategies(selectedStrategies);
        const positionError = !validatePosition(marketType, position);
        const dateError = !validateDateRange(startDate, endDate);

    const isValid = !typeError && !strategyError && !positionError && !dateError;

    return { isValid, typeError, strategyError, positionError, dateError };
};