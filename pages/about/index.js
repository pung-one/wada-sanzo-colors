import styled from "styled-components";

export default function AboutPage() {
  return (
    <PageContainer>
      <Article>
        <Headline>Wada Sanzo</Headline>
        <p>
          <Link href="https://en.wikipedia.org/wiki/Sanzo_Wada" target="_blank">
            Wada Sanzo
          </Link>{" "}
          (1883-1967) was a Japanese artist, teacher, and researcher who devoted
          his life to the study of color theory. He believed that color was not
          just a decorative element, but a powerful tool for communication and
          expression. Wada developed his own unique color system, which was
          based on the traditional Japanese sense of color, as well as Western
          color theory. Wada&apos;s color system focused on the relationships
          between colors and their emotional and cultural associations. He
          categorized colors into different schemes, such as monochromatic,
          complementary, triadic, and more. He also explored the use of color in
          different artistic mediums, such as painting, printmaking, and textile
          design. Wada&apos;s work on color theory had a significant impact on
          the development of modern graphic design in Japan. His teachings and
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
        </p>
      </Article>
      <Footer>
        <Headline>Impressum</Headline>
        <Info>
          GitHub:{" "}
          <Link href="https://github.com/pung-one" target="_blank">
            https://github.com/pung-one
          </Link>
          <br />
          (if you want to support me please use the "Donate" button in the lower
          left corner)
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
  padding: 15vh 5vw 2vh 5vw;
  display: flex;
  flex-direction: column;
  float: left;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
    padding: 7vh 5vw 10vh 5vw;
  }
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
  margin: 5vh 0 10vh;
`;

const Link = styled.a`
  text-decoration: underline;
`;

const Info = styled.aside`
  margin-bottom: 2vh;
`;
