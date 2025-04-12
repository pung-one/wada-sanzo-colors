import CopyField from "@/components/CopyField/CopyField";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";
import styled, { css } from "styled-components";
import { useState } from "react";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import CopyColorCodeMessage from "../CopyColorCodeMessage/CopyColorCodeMessage";
import { ColorObject } from "@/lib/types";

type Props = {
  isLargeCombination: boolean;
  color: ColorObject;
  index?: number;
  onHandleSlide: () => void;
  isActive: boolean;
  needColorName: boolean;
};

export default function CopyFieldSlider({
  isLargeCombination,
  color,
  index,
  onHandleSlide,
  isActive,
  needColorName,
}: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [label, setLabel] = useState("");

  const { slug, name, hex, rgb, cmyk, lab } = color;

  function handleShowMessage(label: string) {
    setShowMessage(true);
    setLabel(label);
    setTimeout(() => setShowMessage(false), 1500);
  }

  return (
    <>
      <SliderContainer
        $isLarge={isLargeCombination}
        $isLeftBox={!isLargeCombination && index === 0}
        $isActive={isActive}
      >
        <CopyColorCodeMessage
          isLarge={isLargeCombination}
          showMessage={showMessage}
          label={label}
        />

        <StyledButton
          onClick={() => onHandleSlide()}
          $isLeftBox={!isLargeCombination && index === 0}
          $isLarge={isLargeCombination}
          $isActive={isActive}
          aria-label={"show and hide color-codes"}
        >
          <Arrow $isBright={IsColorBright(rgb)} />
        </StyledButton>
        {needColorName && (
          <Link href={`/colors/${slug}`}>
            <StyledColorName
              $isLarge={isLargeCombination}
              $isBright={IsColorBright(rgb)}
            >
              {name}
            </StyledColorName>
          </Link>
        )}
        <CopyFieldContainer $isLarge={isLargeCombination}>
          <CopyField
            label={"HEX"}
            value={hex}
            isLarge={isLargeCombination}
            onShowMessage={() => handleShowMessage("HEX")}
          />
          <CopyField
            label={"RGB"}
            value={rgb}
            isLarge={isLargeCombination}
            onShowMessage={() => handleShowMessage("RGB")}
          />
          <CopyField
            label={"CMYK"}
            value={cmyk}
            isLarge={isLargeCombination}
            onShowMessage={() => handleShowMessage("CMYK")}
          />
          <CopyField
            label={"LAB"}
            value={lab}
            isLarge={isLargeCombination}
            onShowMessage={() => handleShowMessage("LAB")}
          />
        </CopyFieldContainer>
      </SliderContainer>
    </>
  );
}

const SliderContainer = styled.aside<{
  $isLarge: boolean;
  $isLeftBox: boolean;
  $isActive: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ $isLarge }) => ($isLarge ? "2vh 0 1vh" : "8vh 0 10vh")};
  width: 100%;
  height: 100%;
  transform: ${({ $isActive, $isLeftBox }) =>
    $isActive && $isLeftBox
      ? "translate(85%)"
      : $isActive
      ? "translate(-85%)"
      : ""};
  right: ${({ $isLeftBox }) => ($isLeftBox ? null : "-88%")};
  left: ${({ $isLeftBox }) => ($isLeftBox ? "-88%" : null)};
  transition: transform 0.3s;
`;

const StyledButton = styled.button<{
  $isLeftBox: boolean;
  $isLarge: boolean;
  $isActive: boolean;
}>`
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  transform: ${({ $isActive, $isLeftBox }) =>
    $isLeftBox && $isActive
      ? "rotate(360deg)"
      : $isActive || $isLeftBox
      ? "rotate(180deg)"
      : null};
  transition: transform 0.3s;
  ${({ $isLeftBox, $isLarge }) =>
    $isLeftBox
      ? css`
          right: -15%;
        `
      : !$isLeftBox && !$isLarge
      ? css`
          left: -15%;
        `
      : css`
          left: 0;
        `}
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled(SlArrowLeft)<{ $isBright: boolean }>`
  font-size: 4vh;
  fill: ${(props) => (props.$isBright ? "black" : "white")};
`;

const StyledColorName = styled.h2<{
  $isLarge: boolean;
  $isBright: boolean;
}>`
  text-align: center;
  text-decoration: underline;
  font-weight: lighter;
  margin: auto;
  width: ${({ $isLarge }) => ($isLarge ? "100%" : "90%")};
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;

const CopyFieldContainer = styled.div<{ $isLarge: boolean }>`
  position: relative;
  display: grid;
  grid-template: ${({ $isLarge }) =>
    $isLarge ? "1fr 1fr / 1fr 1fr" : "1fr 1fr 1fr 1fr / 1fr"};
  justify-items: center;
  padding: ${({ $isLarge }) => ($isLarge ? "2vh 0 0 0" : "5vh 0 0")};
  gap: ${({ $isLarge }) => ($isLarge ? "1vh" : "")};
  height: ${({ $isLarge }) => ($isLarge ? "100%" : "80%")};
  width: ${({ $isLarge }) => ($isLarge ? "60%" : "50%")};
  padding-bottom: 2vh;
`;
