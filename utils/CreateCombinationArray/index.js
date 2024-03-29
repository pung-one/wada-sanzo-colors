export function CreateCombinationArray(data) {
  let combinationArray = [];
  for (let i = 1; i <= 348; i++) {
    const combination = {
      id: i,
      combination: data?.filter((color) =>
        color.combinations.some((combi) => combi === i)
      ),
    };
    combinationArray.push(combination);
  }
  return combinationArray;
}
