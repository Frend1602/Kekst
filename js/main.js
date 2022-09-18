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

const DESCRIPTIONS = [
  'неплохое фото_1',
  'неплохое фото_2',
  'неплохое фото_3',
  'неплохое фото_4',
  'неплохое фото_5',
];

const COMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'alex',
  'piter',
  'dasha',
  'max',
]

const countObj = 25;
const randomArrayValue = generateArrayRandomNumber(1, countObj);
const randomArrayKey = generateArrayRandomNumber(0, randomArrayValue.length);

const createObj = (i) => {
  return {
    id: randomArrayValue[i],
    url: 'photos/' + i + '.jpg',
    description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
    likes: getRandomNumber(15, 200),
    comment: {
      id: '',
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: COMENTS[getRandomNumber(0, COMENTS.length)],
      name: NAMES[getRandomNumber(0, NAMES.length)],
    },
  }
}

const buildBase = () => {
  let base = []
  for (let j = 0; j < countObj; j++) {
    base.push(createObj(j));
  }
  return base;
};

console.log(buildBase());
