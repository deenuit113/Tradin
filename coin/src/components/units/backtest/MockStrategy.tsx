// src/strategies/mockStrategies.ts
export type StrategyKey = 'A' | 'B' | 'C';

export const strategies = {
    A: {
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.open) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.open) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.95;
        },
    },
    B: {
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.low) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.high) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.90;
        },
    },
    C: {
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.low * 0.98) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.high * 1.02) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.92;
        },
    },
};
