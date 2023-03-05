import { useSWR } from "swr";
import { colors } from "../../../data/colors.js";

export default async function handler(req, res) {
  /* const response = await fetch("https://sanzo-wada.dmbk.io/assets/colors.json"); */

  res.status(200).json(colors);
}
