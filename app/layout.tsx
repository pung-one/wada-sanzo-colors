import { Layout } from "../components/Layout/Layout";
import StyledComponentsRegistry from "../lib/registry";
import { GlobalStyle } from "../styles";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider/FavoritesProvider";

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

const AvenirLTStdBook = localFont({
  src: "./AvenirLTStd-Book.otf",
  display: "swap",
  variable: "--AvenirLTStdBook",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={AvenirLTStdBook.className}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />

          <GoogleOAuthProvider clientId={process.env.GOOGLE_ID ?? ""}>
            <AuthProvider>
              <FavoritesProvider>
                <Layout>{children}</Layout>
              </FavoritesProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
        </StyledComponentsRegistry>

        <Analytics />
      </body>
    </html>
  );
}
