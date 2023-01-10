import { generateArrayRandomNumber, getRandomNumber } from "./util.js";

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
  'Кристина',
  'Вика',
  'Игорь',
  'Виктор',
  'Катя',
  'Денис',
];

const basePhotos = [];
const COUNT_OBJ = 25;
const randomArrayId = generateArrayRandomNumber(1, COUNT_OBJ);
const randomArrayUrl = generateArrayRandomNumber(1, COUNT_OBJ);
const comments = { min: 0, max: 3 };
const id = { min: 1, max: 999 };
const avatar = { min: 1, max: 6 };
const likes = { min: 15, max: 200 };

const addComments = () => {
  let comentsBase = [];
  for (let i = 0; i <= getRandomNumber(comments.min, comments.max); i++) {
    comentsBase.push({
      id: getRandomNumber(id.min, id.max),
      avatar: 'img/avatar-' + getRandomNumber(avatar.min, avatar.max) + '.svg',
      message: COMENTS[getRandomNumber(0, COMENTS.length)],
      name: NAMES[getRandomNumber(0, NAMES.length)],
    });
  }
  return comentsBase;
};


const createPic = () => {
  for (let i = 0; i < COUNT_OBJ; i++) {
    basePhotos.push({
      id: randomArrayId[i],
      url: 'photos/' + randomArrayUrl[i] + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)],
      likes: getRandomNumber(likes.min, likes.max),
      comments: addComments(),
    })
  }
};

createPic();

export { basePhotos };

