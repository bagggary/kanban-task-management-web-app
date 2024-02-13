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

export function getRandomColor(index: number) {
  const colors = [
    "rgb(73, 196, 229)",
    "rgb(132, 113, 242)",
    "rgb(103, 226, 174)",
    "rgb(33, 25, 81)",
    "rgb(131, 111, 255)",
    "rgb(208, 72, 72)",
    "rgb(253, 231, 103)",
  ];
  if (index < colors.length) {
    return colors[index];
  } else {
    return "rgb(104, 149, 210)";
  }
}
