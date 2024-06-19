import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../src/components/commons/Header";
import { SidebarProvider } from "../src/components/commons/SidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>project</title>
            </Head>
            <SidebarProvider>
                <Header />
            <Component {...pageProps} />
            </SidebarProvider>
            <style jsx global>{`
                footer {
                    display: none;
                }
            `}</style>
        </>
    );
}

export default MyApp;