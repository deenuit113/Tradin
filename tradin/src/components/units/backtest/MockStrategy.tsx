// src/strategies/mockStrategies.ts
export type StrategyKey = 'F1' | 'F2' | 'F3' | 'S1' | 'S2' | 'S3';

export const strategies = {
    // 선물 전략
    F1: {
        type: '선물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.open * 0.995) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.open * 1.005) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.98;
        },
    },
    F2: {
        type: '선물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.low * 1.005) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.high * 0.995) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.97;
        },
    },
    F3: {
        type: '선물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.low * 1.01) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.high * 0.99) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.96;
        },
    },
    // 현물 전략
    S1: {
        type: '현물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close < args.bar.open * 0.995) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close > args.bar.open * 1.005) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.98;
        },
    },
    S2: {
        type: '현물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.volume > args.prevBar.volume * 1.2) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.volume < args.prevBar.volume * 0.8) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.97;
        },
    },
    S3: {
        type: '현물',
        entryRule: (enterPosition: any, args: any) => {
            if (args.bar.close > args.bar.high * 0.995) {
                enterPosition();
            }
        },
        exitRule: (exitPosition: any, args: any) => {
            if (args.bar.close < args.bar.low * 1.005) {
                exitPosition();
            }
        },
        stopLoss: (args: any) => {
            return args.entryPrice * 0.96;
        },
    },
};