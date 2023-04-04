import CopyField from "@/components/CopyField";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import styled, { css } from "styled-components";
import { useState } from "react";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import CopyColorCodeMessage from "../CopyColorCodeMessage";

export default function CopyFieldSlider({
  isLargeCombination,
  color,
  index,
  handleSlide,
  isActive,
  needColorName,
}) {
  const [showMessage, setShowMessage] = useState(false);
  const [label, setLabel] = useState("");
  const [copyValue, setCopyValue] = useState("");

  const { slug, name, hex, rgb, cmyk, lab } = color;

  function handleShowMessage(value, label) {
    setShowMessage(true);
    setCopyValue(value);
    setLabel(label);
    setTimeout(() => setShowMessage(false), 1500);
  }

  return (
    <>
      <SliderContainer
        isLarge={isLargeCombination}
        isLeftBox={!isLargeCombination && index === 0}
        isActive={isActive}
      >
        <CopyColorCodeMessage
          isLarge={isLargeCombination}
          showMessage={showMessage}
          value={copyValue}
          label={label}
        />
        <StyledButton
          onClick={() => handleSlide(index)}
          isLeftBox={!isLargeCombination && index === 0}
          isActive={isActive}
          aria-label={"show and hide color-codes"}
        >
          <Arrow isBright={IsColorBright(rgb)} />
        </StyledButton>
        {needColorName && (
          <Link href={`/colors/${slug}`}>
            <StyledColorName
              isLarge={isLargeCombination}
              isBright={IsColorBright(rgb)}
            >
              {name}
            </StyledColorName>
          </Link>
        )}
        <CopyFieldContainer
          isLarge={isLargeCombination}
          isLeftBox={!isLargeCombination && index === 0}
        >
          <CopyField
            label={"HEX"}
            value={hex}
            isLarge={isLargeCombination}
            name={name}
            onShowMessage={handleShowMessage}
          />
          <CopyField
            label={"RGB"}
            value={rgb}
            isLarge={isLargeCombination}
            name={name}
            onShowMessage={handleShowMessage}
          />
          <CopyField
            label={"CMYK"}
            value={cmyk}
            isLarge={isLargeCombination}
            name={name}
            onShowMessage={handleShowMessage}
          />
          <CopyField
            label={"LAB"}
            value={lab}
            isLarge={isLargeCombination}
            name={name}
            onShowMessage={handleShowMessage}
          />
        </CopyFieldContainer>
      </SliderContainer>
    </>
  );
}

const SliderContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ isLarge }) => (isLarge ? "2vh 0 1vh" : "8vh 0 10vh")};
  width: ${({ isLarge }) => (isLarge ? "100vw" : "50vw")};
  height: 100%;
  transform: ${({ isActive, isLeftBox }) =>
    isActive && isLeftBox
      ? "translate(85%)"
      : isActive
      ? "translate(-85%)"
      : ""};
  left: ${({ isLeftBox }) => (isLeftBox ? "-43vw" : null)};
  right: ${({ isLarge, isLeftBox }) =>
    isLarge && !isLeftBox ? "-88vw" : "-43vw"};
  transition: transform 0.3s;
`;

const StyledButton = styled.button`
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  transform: ${({ isActive, isLeftBox }) =>
    isLeftBox && isActive
      ? "rotate(360deg)"
      : isActive || isLeftBox
      ? "rotate(180deg)"
      : null};
  transition: transform 0.3s;
  ${(props) =>
    props.isLeftBox
      ? css`
          right: -1vw;
        `
      : css`
          left: -1vw;
        `}
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled(SlArrowLeft)`
  font-size: 4vh;
  fill: ${({ isBright }) => (isBright ? "black" : "white")};
`;

const StyledColorName = styled.h2`
  position: relative;
  text-align: center;
  text-decoration: underline;
  font-weight: lighter;
  width: ${({ isLarge }) => (isLarge ? "100vw" : "35vw")};
  color: ${({ isBright }) => (isBright ? "black" : "white")};
  left: ${({ isLarge }) => (isLarge ? "-3vw" : "0")};
`;

const CopyFieldContainer = styled.div`
  position: relative;
  display: grid;
  grid-template: ${({ isLarge }) =>
    isLarge ? "1fr 1fr / 1fr 1fr" : "1fr 1fr 1fr 1fr / 1fr"};
  justify-items: center;
  padding: ${({ isLarge }) => (isLarge ? "2vh 0 0 0" : "5vh 0 0")};
  gap: ${({ isLarge }) => (isLarge ? "1vh" : "")};
  width: ${({ isLarge }) => (isLarge ? "70vw" : "50vw")};
  height: ${({ isLarge }) => (isLarge ? "100%" : "80%")};
  left: ${({ isLarge }) => (isLarge ? "-3vw" : "0")};
  padding-bottom: 2vh;
`;
