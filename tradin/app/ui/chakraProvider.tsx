'use client';

import { ChakraProvider } from '@chakra-ui/react'
import system from '@/styles/chakraTheme';
import { ColorModeProvider, type ColorModeProviderProps } from '@/components/ui/color-mode';

export function Provider(props: ColorModeProviderProps) {

    return (
        <ChakraProvider value={system}>
                <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}