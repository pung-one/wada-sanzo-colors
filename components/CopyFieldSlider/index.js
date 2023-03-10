import CopyField from "@/components/CopyField";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import styled, { css } from "styled-components";

const CopyFieldContainer = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: ${({ isLarge }) => (isLarge ? "100%" : "70%")};
  width: ${({ isLarge }) => (isLarge ? "85%" : "100%")};
  transform: ${({ isActive }) => (isActive ? "translate(-83%)" : "")};
  transform: ${({ isActive, isLeftBox }) =>
    isActive && isLeftBox ? "translate(83%)" : ""};
  transition: transform 0.3s;
  ${(props) =>
    props.isLeftBox
      ? css`
          left: -83%;
          }
        `
      : css`
          right: -83%;
        `}
`;

const StyledButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  ${(props) =>
    props.isLeftBox
      ? css`
          right: 0%;
          }
        `
      : css`
          left: 0%;
        `}
`;

const Arrow = styled(SlArrowLeft)`
  font-size: 3vh;
  transform: ${({ isActive, isLeftBox }) =>
    isActive || isLeftBox ? "rotate(180deg)" : ""};
  transform: ${({ isLeftBox, isActive }) =>
    isLeftBox && isActive ? "rotate(360deg)" : ""};
  transition: transform 0.3s;
`;

export default function CopyFieldSlider({
  isLargePalette,
  color,
  index,
  handleSlide,
  isActive,
  needColorName,
}) {
  const { slug, name, hex, rgb, cmyk, lab } = color;
  return (
    <CopyFieldContainer
      isLarge={isLargePalette}
      isLeftBox={!isLargePalette && index === 0}
      isActive={isActive}
    >
      <StyledButton
        onClick={() => handleSlide(index)}
        isLeftBox={!isLargePalette && index === 0}
      >
        <Arrow isLeftBox={!isLargePalette && index === 0} isActive={isActive} />
      </StyledButton>
      {needColorName && (
        <Link href={`/colors/${slug}`}>
          <h2>{name}</h2>
        </Link>
      )}
      <CopyField label={"HEX"} value={hex} isLarge={isLargePalette} />
      <CopyField label={"RGB"} value={rgb} isLarge={isLargePalette} />
      <CopyField label={"CMYK"} value={cmyk} isLarge={isLargePalette} />
      <CopyField label={"LAB"} value={lab} isLarge={isLargePalette} />
    </CopyFieldContainer>
  );
}
