import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../src/components/commons/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>project</title>
            </Head>
            <Header />
            <Component {...pageProps} />
            <style jsx global>{`
                footer {
                    display: none;
                }
            `}</style>
        </>
    );
}

export default MyApp;