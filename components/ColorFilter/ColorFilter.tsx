import { css } from "styled-components";
import styled from "styled-components";
import { useContext } from "react";
import { ActionContext } from "../Layout/Layout";

type Props = {
  isAtFavorites: boolean;
};

export default function ColorFilter({ isAtFavorites }: Props) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { favoriteColorsData, colorListType, setColorListType } = actionContext;

  return (
    <FilterContainer>
      <StyledButton
        onClick={() => setColorListType(colorListType === 1 ? 0 : 1)}
        $isActive={colorListType === 1}
        $swatch={"red/purple"}
        aria-label={"only show colors from swatch nr. 1: red/purple"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 0 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>

      <StyledButton
        onClick={() => setColorListType(colorListType === 2 ? 0 : 2)}
        $isActive={colorListType === 2}
        $swatch={"yellow/red"}
        aria-label={"only show colors from swatch nr. 2: yellow/red"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 1 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>

      <StyledButton
        onClick={() => setColorListType(colorListType === 3 ? 0 : 3)}
        $isActive={colorListType === 3}
        $swatch={"yellow/green"}
        aria-label={"only show colors from swatch nr. 3: yellow/green"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 2 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>

      <StyledButton
        onClick={() => setColorListType(colorListType === 4 ? 0 : 4)}
        $isActive={colorListType === 4}
        $swatch={"blue/turquoise"}
        aria-label={"only show colors from swatch nr. 4: blue/turquoise"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 3 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>

      <StyledButton
        onClick={() => setColorListType(colorListType === 5 ? 0 : 5)}
        $isActive={colorListType === 5}
        $swatch={"blue/purple"}
        aria-label={"only show colors from swatch nr. 5: blue/purple"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 4 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>

      <StyledButton
        onClick={() => setColorListType(colorListType === 6 ? 0 : 6)}
        $isActive={colorListType === 6}
        $swatch={"white/grey/black"}
        aria-label={"only show colors from swatch nr. 6: white/grey/black"}
      >
        {isAtFavorites && (
          <StyledNumber>
            {
              favoriteColorsData.filter(
                (color) => color.swatch === 5 && color.isFavorite
              ).length
            }
          </StyledNumber>
        )}
      </StyledButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid black;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    position: fixed;
    top: 60px;
    width: 70%;
    margin-left: 30%;
  }
`;

const StyledButton = styled.button<{ $isActive: boolean; $swatch: string }>`
  position: relative;
  border: 1px solid black;
  height: 40px;
  flex-grow: 1;
  width: 30%;
  overflow: hidden;
  box-shadow: ${({ $isActive }) => ($isActive ? null : "0 0 2px black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }

  &:before {
    display: ${({ $isActive }) => ($isActive ? "initial" : "none")};
    content: ${({ $swatch }) => `"${$swatch}"`};
    position: absolute;
    color: white;
    font-size: 0.8rem;
    line-height: 40px;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
  }
  ${(props) =>
    props.$swatch === "red/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(249, 193, 206, 1) 10%,
            rgba(203, 47, 67, 1) 50%,
            rgba(100, 45, 94, 1) 90%
          );
        `
      : props.$swatch === "yellow/red"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 242, 0, 1) 10%,
            rgba(217, 102, 41, 1) 50%,
            rgba(107, 113, 64, 1) 90%
          );
        `
      : props.$swatch === "yellow/green"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(199, 209, 79, 1) 10%,
            rgba(0, 180, 155, 1) 50%,
            rgba(26, 116, 68, 1) 90%
          );
        `
      : props.$swatch === "blue/turquoise"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(188, 228, 229, 1) 10%,
            rgba(98, 198, 191, 1) 50%,
            rgba(18, 53, 78, 1) 90%
          );
        `
      : props.$swatch === "blue/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(181, 177, 216, 1) 10%,
            rgba(100, 80, 161, 1) 50%,
            rgba(80, 19, 69, 1) 90%
          );
        `
      : props.$swatch === "white/grey/black"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 10%,
            rgba(162, 176, 173, 1) 50%,
            rgba(17, 19, 20, 1) 90%
          );
        `
      : null}
  background: ${({ $isActive }) => ($isActive ? "black" : "")};
`;

const StyledNumber = styled.span`
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 0.6rem;
  color: white;
`;
