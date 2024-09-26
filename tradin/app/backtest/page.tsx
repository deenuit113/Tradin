'use client';

import BackTestPage from "../../src/components/units/backtest/main/BackTest";
import { BackTestProvider } from "../../src/contexts/BackTestContext";

export default function BackTest() {
    return (
        <BackTestProvider>
            <BackTestPage />
        </BackTestProvider>
    );
}