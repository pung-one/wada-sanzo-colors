import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Colors</title>
      </Head>
      <Component {...pageProps} data={data} error={error} />
    </>
  );
}
