"use client";

import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";

import dynamic from "next/dynamic";

const Inspiration = dynamic(
  () => import("@/components/Inspiration/Inspiration"),
  {
    ssr: false,
  }
);

export default function InspirationPage() {
  return (
    <Inspiration
      colors={colorsWithSlug}
      combinations={createCombinationArray(colorsWithSlug)}
    />
  );
}
