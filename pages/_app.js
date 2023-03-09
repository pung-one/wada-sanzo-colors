import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Navigation";
import { useState } from "react";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);
  const [filter, setFilter] = useState("new");

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Colors</title>
      </Head>
      <Layout setPickerFilter={setFilter}>
        <Component
          {...pageProps}
          data={data}
          error={error}
          pickerFilter={filter}
          setPickerFilter={setFilter}
        />
      </Layout>
    </>
  );
}
