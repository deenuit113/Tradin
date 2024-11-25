'use client';

import './ui/global.css';
import { noto_sans_kr } from './ui/fonts';
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from "../src/components/commons/header/main/Header.container";
import { SidebarProvider } from "../src/contexts/SidebarContext";
import { RecoilRoot } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "../src/components/commons/sidebar/Sidebar";
import { UserProvider } from '../src/contexts/UserContext';
import { usePathname } from 'next/navigation';
import { Provider } from './ui/chakraProvider';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';


const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const excludedPaths = ['/login'];
    const shouldShowLayout = !excludedPaths.includes(pathname);
    const cache = createCache({ key: 'css', prepend: true });
    return (
        <html lang="ko" className={noto_sans_kr.className}>
            <head>
                <title>Tradin</title>
            </head>
            <body suppressHydrationWarning>
                <CacheProvider value={cache}>
                    <Provider>
                        <RecoilRoot>
                            <QueryClientProvider client={queryClient}>
                                <UserProvider>
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
                                </UserProvider>
                                <ReactQueryDevtools initialIsOpen={false} />
                            </QueryClientProvider>
                        </RecoilRoot>
                    </Provider>
                </CacheProvider>
                
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