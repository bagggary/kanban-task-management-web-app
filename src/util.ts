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
  ];
  if (index < colors.length) {
    return colors[index];
  } else {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
