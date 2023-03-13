import Link from "next/link";
import styled from "styled-components";
import { IsColorBright } from "@/utils/IsColorBright";
import FavoriteButton from "../FavoriteButton";

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
  margin-bottom: 11vh;
`;

const ColorBox = styled.li`
  position: relative;
  height: 25vh;
  margin-top: 2vh;
  line-height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

const StyledColorName = styled.p`
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function ColorsList({
  colors,
  error,
  favoriteColors,
  onToggleFavorite,
}) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!colors) return <h1>Loading...</h1>;

  /* console.log(favoriteColors); */
  return (
    <List>
      {colors.map(({ name, slug, rgb, hex }) => {
        const favoriteStatus = favoriteColors?.find(
          (color) => color.name === name
        );
        return (
          <ColorBox key={name} isBright={IsColorBright(rgb)} hex={hex}>
            <FavoriteButton
              isBright={IsColorBright(rgb)}
              isFavorite={favoriteStatus?.isFavorite}
              isOnListElement={true}
              toggleValue={name}
              onToggleFavorite={onToggleFavorite}
            />
            <Link aria-label={`got to color ${name}`} href={`/colors/${slug}`}>
              <StyledColorName isBright={IsColorBright(rgb)}>
                {name}
              </StyledColorName>
            </Link>
          </ColorBox>
        );
      })}
    </List>
  );
}
