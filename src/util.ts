export const generateId = (letter: number, number: number) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUWVXYZ";
  const numbers = "123456789";
  let id = "";
  for (let i = 0; i < letter; i++) {
    const twoLetters = letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
    id += twoLetters;
  }
  for (let k = 0; k < number; k++) {
    const fourNumbers = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
    id += fourNumbers;
  }
  return id;
};
