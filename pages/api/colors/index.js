import { useSWR } from "swr";
import { colors } from "../../../data/colors.js";

export default async function handler(req, res) {
  res.status(200).json(colors);
}
