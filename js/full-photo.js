const bigPicture = document.querySelector('.big-picture');
const allpreview = document.querySelector('#picture').content.querySelector('.picture');
const btnCloseModal = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

allpreview.addEventListener('click', () => { bigPicture.classList.remove('hidden') });



// скрываем лишнее

const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  btnCloseModal.removeEventListener('click', closeModal);
};

// функция вывода комментариев
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentList = document.querySelector('.big-picture__social')

const renderComment = (comment) => {
  const commentSimilar = commentTemplate.cloneNode(true);

  commentSimilar.querySelector('.social__picture').src = comment.avatar;
  commentSimilar.querySelector('.social__picture').alt = comment.name;
  commentSimilar.querySelector('.social__text').textContent = comment.message;

  return commentSimilar;
};

const renderComments = (comments) => {
  let commentsListFragment = document.createDocumentFragment();

  comments.forEach(comment => {
    commentsListFragment.appendChild(renderComment(comment));
  });

  commentList.appendChild(commentsListFragment);
}

// функция вывода большого фото

const show = (picture) => {
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  btnCloseModal.addEventListener('click', closeModal);
  bigPicture.classList.remove('hidden');

  renderComments(picture.comments)
};

export { show };
