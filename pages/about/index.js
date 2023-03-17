import styled from "styled-components";

const PageContainer = styled.main`
  margin: 12vh 0 5vh;
  padding: 0 5vw 2vh 5vw;
  float: left;
`;
const Article = styled.article`
  text-align: start;
  margin-top: 5vh;
  line-height: 2.8vh;
`;

const Headline = styled.h2`
  margin-bottom: 2.5vh;
  font-weight: lighter;
  line-height: 3.5vh;
  font-size: 3vh;
`;

const Footer = styled.footer`
  margin-top: 5vh;
`;

const Link = styled.a`
  text-decoration: underline;
`;

const Info = styled.aside`
  margin-bottom: 2vh;
`;

export default function AboutPage() {
  return (
    <PageContainer>
      <Article>
        <Headline>Wada Sanzo</Headline>
        <p>
          Wada Sanzo (1883-1967) was a Japanese artist, teacher, and researcher
          who devoted his life to the study of color theory. He believed that
          color was not just a decorative element, but a powerful tool for
          communication and expression. Wada developed his own unique color
          system, which was based on the traditional Japanese sense of color, as
          well as Western color theory. Wada&apos;s color system focused on the
          relationships between colors and their emotional and cultural
          associations. He categorized colors into different schemes, such as
          monochromatic, complementary, triadic, and more. He also explored the
          use of color in different artistic mediums, such as painting,
          printmaking, and textile design. Wada&apos;s work on color theory had
          a significant impact on the development of modern graphic design in
          Japan. His teachings and philosophy influenced generations of
          designers and artists, and his ideas about color continue to be
          studied and applied in various fields today.
        </p>
      </Article>
      <Article>
        <Headline>A Dictionary of Color Combinations Vol. 1</Headline>
        <p>
          &quot;A Dictionary of Color Combinations Vol. 1&quot; is a collection
          of 348 color combinations based on 159 colors. This website offers an
          interactive adaptation of the collection that allows users to access
          and copy the CMYK, RGB, HEX, and LAB codes (Thanks to{" "}
          <Link href="https://github.com/mattdesl/dictionary-of-colour-combinations">
            Matt DesLauriers
          </Link>
          ). The original 6-volume work Haishoku Soukan (The complete collection
          of color combinations) by Wada Sanzo, from which the book is derived,
          was published from 1933 to 1934. It was a period permeated with a new
          atmosphere brought on by the influence of western culture. The concept
          of &quot;combining colors&quot; was not generally recognized at the
          time, so, samplers of color combinations containing specific color
          combination patterns were highly unusual. Hashoku Soukan was the
          precursor of such samplers.
        </p>
      </Article>
      <Footer>
        <Headline>Impressum</Headline>
        <Info>
          GitHub:{" "}
          <Link href="https://github.com/pung-one">
            https://github.com/pung-one
          </Link>
        </Info>
        <Info>
          Source of Digital Color Collection:{" "}
          <Link href="https://github.com/mattdesl/dictionary-of-colour-combinations">
            https://github.com/mattdesl/dictionary-of-colour-combinations
          </Link>
        </Info>
        {/* <Info>
          Thank you for Inspiration:{" "}
          <Link href="https://sanzo-wada.dmbk.io/">
            https://sanzo-wada.dmbk.io/
          </Link>
        </Info> */}
      </Footer>
    </PageContainer>
  );
}
