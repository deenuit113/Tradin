// src/strategies/mockStrategies.ts
export type StrategyKey = 'F1' | 'F2' | 'F3' | 'S1' | 'S2' | 'S3';

export const strategies = {
    // 선물 전략
    F1: {
        type: 'futures',
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
    F2: {
        type: 'futures',
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
    F3: {
        type: 'futures',
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
    // 현물 전략
    S1: {
        type: 'spot',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.open * 0.99) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.open * 1.01) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.97;
        },
    },
    S2: {
        type: 'spot',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.volume > args.prevBar.volume * 1.5) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.volume < args.prevBar.volume * 0.5) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.95;
        },
    },
    S3: {
        type: 'spot',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close > args.bar.high * 1.01) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close < args.bar.low * 0.99) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.93;
        },
    },
};