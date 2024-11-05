'use client';

import './ui/global.css';
import { noto_sans_kr } from './ui/fonts';
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from "../src/components/commons/header/main/Header.container";
import { SidebarProvider } from "../src/contexts/SidebarContext";
import { RecoilRoot, useRecoilState } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "../src/components/commons/sidebar/Sidebar";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../src/styles/theme";
import { darkMode } from "../src/util/atoms";
import { UserProvider } from '../src/contexts/UserContext';
import { usePathname } from 'next/navigation';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const excludedPaths = ['/login'];
    const shouldShowLayout = !excludedPaths.includes(pathname);

    return (
        <html lang="ko" className={noto_sans_kr.className}>
            <head>
                <title>Tradin</title>
            </head>
            <body>
                <RecoilRoot>
                    <QueryClientProvider client={queryClient}>
                        <UserProvider>
                        <ThemeWrapper>
                                <DndProvider backend={HTML5Backend}>
                                    <SidebarProvider>
                                        {shouldShowLayout && (
                                            <>
                                                <Header/>
                                                <SideBar />
                                            </>
                                        )}
                                        {children}
                                    </SidebarProvider>
                                </DndProvider>
                            </ThemeWrapper>
                        </UserProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </RecoilRoot>
                <style jsx global>{`
                    html, body, #__next {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                    }
                    * {
                        box-sizing: border-box;
                    }  
                    
                    footer {
                        display: none;
                    }
                `}</style>
            </body>
        </html>
    );
}

function ThemeWrapper({ children }: { children: ReactNode }) {
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
}