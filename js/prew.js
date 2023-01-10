import { basePhotos } from "./data.js";
import { show } from "./full-photo.js";

const pictures = document.querySelector('.pictures');
const pictureTempl = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPhoto = (picture) => {
  const pictureElement = pictureTempl.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    show(picture);
  });

  return pictureElement;
};

const renderPhotos = () => {
  const basePhotosFragment = document.createDocumentFragment();
  basePhotos.forEach((photo) => {
    basePhotosFragment.appendChild(renderPhoto(photo))
  });
  pictures.appendChild(basePhotosFragment);
};



export { renderPhotos };