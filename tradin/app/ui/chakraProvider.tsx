'use client';

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ReactNode } from 'react'
import { useRecoilState } from "recoil";
import system from '@/styles/chakraTheme';
import { ColorModeProvider, type ColorModeProviderProps } from '@/components/ui/color-mode';
interface ProviderProps {
    children: ReactNode
}

export function Provider(props: ColorModeProviderProps) {

    return (
        <ChakraProvider value={system}>
                <ColorModeProvider {...props} />
        </ChakraProvider>
    )
} 
/* 차크라 모두 마이그레이션 하면
export function Provider({ children }: ProviderProps) {
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <NextThemeProvider attribute="class" disableTransitionOnChange>
            <ChakraProvider value={system}>
                <EmotionThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    {children}
                </EmotionThemeProvider>
            </ChakraProvider>
        </NextThemeProvider>
    )
}
*/