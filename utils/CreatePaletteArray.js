export function CreatePaletteArray(data) {
  let paletteArray = [];
  for (let i = 1; i <= 348; i++) {
    const palette = data?.filter((color) =>
      color.combinations.some((combi) => combi === i)
    );
    paletteArray.push(palette);
  }
  return paletteArray;
}
