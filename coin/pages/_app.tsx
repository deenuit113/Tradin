import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../src/components/commons/header/Header";
import { SidebarProvider } from "../src/components/commons/sidebar/SidebarContext";
import { RecoilRoot, useRecoilState } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "../src/components/commons/sidebar/Sidebar";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../src/styles/theme";
import { darkMode } from "../src/components/commons/atoms";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Tradin</title>
            </Head>
            <RecoilRoot>
                <ThemeWrapper>
                    <DndProvider backend={HTML5Backend}>
                        <SidebarProvider>
                            <Header />
                            <SideBar />
                            <Component {...pageProps} />
                        </SidebarProvider>
                    </DndProvider>
                </ThemeWrapper>
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
        </>
    );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    );
}

export default MyApp;