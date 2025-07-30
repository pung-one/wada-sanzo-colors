"use client";

import styled from "styled-components";
import { RxExternalLink } from "react-icons/rx";
import { AppStoreLink } from "../AppStoreLink/AppStoreLink";

export function About() {
  return (
    <PageContainer>
      <Article>
        <Headline>Wada Sanzo</Headline>
        <p>
          <Link href="https://en.wikipedia.org/wiki/Sanzo_Wada" target="_blank">
            Wada Sanzo
          </Link>{" "}
          (1883-1967) was a Japanese painter, costume designer and researcher
          who devoted his life to the study of color theory. He believed that
          color was not just a decorative element, but a powerful tool for
          communication and expression. Wada developed his own unique color
          system, which was intended to capture traditional Japanese perceptions
          of color. He also explored the use of color in different artistic
          mediums, such as painting, printmaking, and textile design.
          Wada&apos;s work on color theory had a significant impact on the
          development of modern graphic design in Japan. His teachings and
          philosophy influenced generations of designers and artists, and his
          ideas about color continue to be studied and applied in various fields
          today.
        </p>
      </Article>

      <Article>
        <Headline>A Dictionary of Color Combinations Vol. 1</Headline>
        <p>
          &quot;A Dictionary of Color Combinations Vol. 1&quot; is a collection
          of 348 color combinations based on 159 colors. This website offers an
          interactive adaptation of the collection that allows users to access
          and copy the CMYK, RGB, HEX, and LAB codes (Thanks to{" "}
          <Link
            href="https://github.com/mattdesl/dictionary-of-colour-combinations"
            target="_blank"
          >
            Matt DesLauriers
          </Link>
          ). The original 6-volume work Haishoku Soukan (The complete collection
          of color combinations) by Wada Sanzo, from which the book is derived,
          was published from 1933 to 1934.
          <br />
          <br />
          <b>
            You can buy the{" "}
            <Link href="https://amzn.to/3Ge6wkl" target="_blank">
              &quot;A Dictionary of Color Combinations Vol. 1&quot; here on
              Amazon <RxExternalLink />
            </Link>
            .
          </b>
          <br />
          <br />
          <b>
            Or the{" "}
            <Link href="https://amzn.to/3RaFJba" target="_blank">
              &quot;Dictionary Of Color Combinations Volume 2&quot; here{" "}
              <RxExternalLink />
            </Link>
            .
          </b>
        </p>
      </Article>

      <Article>
        <Headline>iOS App W.S. Colors</Headline>
        <ul>
          <li>
            Use the built-in <b>color scanner</b> to match real-world colors
            with those from the collection and find harmonious combinations for
            your project.
          </li>

          <li>
            Browse 348 harmonious color palettes from the original collection.
          </li>

          <li>
            Instantly copy CMYK, RGB, HEX, and LAB values for any color or
            palette.
          </li>

          <li>
            Save favorite palettes and access them on any other device via the
            website.
          </li>
        </ul>

        <AppStoreLink />
      </Article>

      <Footer>
        <Headline>Impressum</Headline>

        <Info>
          GitHub:{" "}
          <Link href="https://github.com/pung-one" target="_blank">
            https://github.com/pung-one
          </Link>
          <br />
          (if you want to support me please use the &quot;Donate&quot; button in
          the lower left corner)
        </Info>

        <Info>
          Source of Digital Color Collection:{" "}
          <Link
            href="https://github.com/mattdesl/dictionary-of-colour-combinations"
            target="_blank"
          >
            https://github.com/mattdesl/dictionary-of-colour-combinations
          </Link>
        </Info>
      </Footer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  padding: 130px 20px;
  display: flex;
  flex-direction: column;
  float: left;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
    padding: 60px 50px;
  }
`;
const Article = styled.article`
  text-align: start;
  margin-top: 50px;
  line-height: 1.5rem;
  ul {
    list-style-position: inside;
    margin-bottom: 30px;
  }
  li {
    margin-bottom: 5px;
  }
`;

const Headline = styled.h2`
  margin-bottom: 30px;
  font-weight: lighter;
  font-size: 1.5rem;
`;

const Footer = styled.footer`
  margin: 50px 0;
`;

const Link = styled.a`
  text-decoration: underline;
`;

const Info = styled.aside`
  margin-bottom: 20px;
`;
