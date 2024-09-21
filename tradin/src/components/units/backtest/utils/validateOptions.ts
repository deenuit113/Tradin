import { StrategyKey } from "../mockdata/MockStrategy";

export const validateMarketType = (marketType: string | null): boolean => {
    return !!marketType;
};

export const validateStrategies = (selectedStrategies: StrategyKey[]): boolean => {
    return selectedStrategies.length > 0;
};

export const validatePosition = (position: string): boolean => {
    return !!position;
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
        const positionError = !validatePosition(position);
        const dateError = !validateDateRange(startDate, endDate);

    const isValid = !typeError && !strategyError && !positionError && !dateError;

    return { isValid, typeError, strategyError, positionError, dateError };
};