export const removeNumbersFromArray = (
  numbersArray: number[],
  numbersToRemove: number[]
): number[] => {
  // Create a Set from the numbers to remove for efficient lookup
  const numbersToRemoveSet = new Set(numbersToRemove);

  // Use filter to create a new array without the numbers to remove
  const resultArray = numbersArray.filter(
    (number) => !numbersToRemoveSet.has(number)
  );

  return resultArray;
};

// Generate a random number between 0 and rangeEnd
export const getRandomNumberFromRange = (rangeEnd: number) =>
  Math.floor(Math.random() * (rangeEnd + 1));

export const range = (rangeEnd: number) =>
  Array.from({ length: rangeEnd }, (_, index) => index);
