import CopyField from "@/components/CopyField/CopyField";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import styled, { css } from "styled-components";
import { useRef, useState } from "react";
import CopyColorCodeMessage from "../CopyColorCodeMessage/CopyColorCodeMessage";
import { ColorObject } from "@/lib/types";

type Props = {
  isLargeCombination: boolean;
  color: ColorObject;
  index?: number;
  needColorName: boolean;
};

export default function CopyFieldSlider({
  isLargeCombination,
  color,
  index,
  needColorName,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [label, setLabel] = useState("");

  let timeoutRef = useRef<NodeJS.Timeout>(null);

  const { slug, name, hex, rgb, cmyk, lab, isBright } = color;

  function handleShowMessage(label: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowMessage(true);
    setLabel(label);
    timeoutRef.current = setTimeout(() => setShowMessage(false), 1500);
  }

  return (
    <SliderContainer
      $isLarge={isLargeCombination}
      $isLeftBox={!isLargeCombination && index === 0}
      $isActive={open}
    >
      <CopyColorCodeMessage
        isLarge={isLargeCombination}
        showMessage={showMessage}
        label={label}
      />

      <StyledButton
        onClick={() => setOpen(!open)}
        $isLeftBox={!isLargeCombination && index === 0}
        $isLarge={isLargeCombination}
        $isActive={open}
        aria-label={"show and hide color-codes"}
        $isBright={isBright}
      >
        {!isLargeCombination && index === 0 ? (
          <SlArrowRight />
        ) : (
          <SlArrowLeft />
        )}
      </StyledButton>

      {needColorName && (
        <Link href={`/colors/${slug}`}>
          <StyledColorName $isLarge={isLargeCombination} $isBright={isBright}>
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
  );
}

const SliderContainer = styled.aside<{
  $isLarge: boolean;
  $isLeftBox: boolean;
  $isActive: boolean;
}>`
  position: relative;
  width: ${({ $isLarge }) => ($isLarge ? "100%" : "100%")};
  transform: ${({ $isActive, $isLeftBox }) =>
    $isActive && $isLeftBox
      ? "translate(100%, -50%)"
      : $isActive
      ? "translate(-100%, -50%)"
      : "translate(0, -50%)"};
  right: ${({ $isLeftBox }) => ($isLeftBox ? null : "-100%")};
  left: ${({ $isLeftBox }) => ($isLeftBox ? "-100%" : null)};
  top: 50%;
  transition: transform 0.3s;
`;

const StyledButton = styled.button<{
  $isLeftBox: boolean;
  $isLarge: boolean;
  $isActive: boolean;
  $isBright: boolean;
}>`
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  top: 50%;
  transform-origin: center;
  transform: ${({ $isActive }) =>
    $isActive
      ? "rotateY(180deg) translateY(-50%)"
      : "rotateY(0deg)  translateY(-50%)"};
  transition: transform 0.3s;
  ${({ $isLeftBox, $isLarge, $isActive }) =>
    $isLeftBox
      ? css`
          right: -20%;
        `
      : $isActive && !$isLarge
      ? css`
          left: -20%;
        `
      : $isActive
      ? css`
          left: 0%;
        `
      : css`
          left: -20%;
        `}
  &:hover {
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  svg {
    transition: font-size 0.2s ease;
    font-size: 1.8rem;
    fill: ${({ $isBright }) => ($isBright ? "black" : "white")};
  }
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: ${({ $isLarge }) => ($isLarge ? "20px 20px 0" : "20px 0 0")};
`;
