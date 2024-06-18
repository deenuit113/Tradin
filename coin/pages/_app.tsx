import type { AppProps } from "next/app";
import Head from "next/head";
import '../styles/globals.css';  // Ensure you have global styles if needed

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>coin project</title>
      </Head>
      <header>
        <h1>coin project</h1>
      </header>
      <Component {...pageProps} />
      <footer>
        <p>© coin project</p>
      </footer>
    </>
  );
}

export default MyApp;