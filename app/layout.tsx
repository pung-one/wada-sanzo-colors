import { Layout } from "../components/Layout";
import StyledComponentsRegistry from "../lib/registry";
import { GlobalStyle } from "../styles";
import { Metadata } from "next";
import ReactDOM from "react-dom";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { getSession, SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Wada Sanzo Colors",
  description:
    "This website offers an interactive adaptation of the book 'A Dictionary of Color Combinations Vol. 1' by Wada Sanzo, that allows users to access and copy the colors CMYK, RGB, HEX, and LAB codes.",
  metadataBase: new URL("https://www.wada-sanzo-colors.com"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Paul Ungerer", url: "https://github.com/pung-one" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Wada Sanzo Colors",
    url: "https://www.wada-sanzo-colors.com",
    siteName:
      "Digital Version of the 'Dictionary of Color Combinations Vol. 1' by Wada Sanzo",
    type: "website",
    description:
      "This website offers an interactive adaptation of the book 'A Dictionary of Color Combinations Vol. 1' by Wada Sanzo, that allows users to access and copy the colors CMYK, RGB, HEX, and LAB codes.",
  },
};

ReactDOM.preload("/fonts/AvenirLTStd-Book.otf", {
  as: "font",
  crossOrigin: "",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />

          <SessionProvider session={session}>
            <Layout>{children}</Layout>
          </SessionProvider>

          <Analytics />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
