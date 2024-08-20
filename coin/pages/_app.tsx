import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../src/components/commons/header/Header";
import { SidebarProvider } from "../src/components/commons/sidebar/SidebarContext";
import { RecoilRoot } from "recoil";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideBar from "../src/components/commons/sidebar/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>project</title>
            </Head>
            <RecoilRoot>
                <DndProvider backend={HTML5Backend}>
                    <SidebarProvider>
                        <Header />
                        <SideBar/>
                        <Component {...pageProps} />
                    </SidebarProvider>
                </DndProvider>
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

export default MyApp;