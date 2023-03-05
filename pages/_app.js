import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const colorsWithSlug = data.map((color) => {
    return {
      ...color,
      slug: color.name.toLocaleLowerCase().split(" ").join("-"),
    };
  });

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Colors</title>
      </Head>
      <Component {...pageProps} colors={colorsWithSlug} />
    </>
  );
}
