const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min]
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

const generateArrayRandomNumber = (min, max) => {
  let totalNumbers = max - min + 1,
    arrayTotalNumbers = [],
    arrayRandomNumbers = [],
    tempRandomNumber;
  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }
  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }
  return arrayRandomNumbers;
}

const checkStringLength = (text, maxLength) => {
  return text.length <= maxLength;
};

checkStringLength('text', 2);

export { getRandomNumber, generateArrayRandomNumber, checkStringLength };
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

export { ESC_KEYCODE, ENTER_KEYCODE };
