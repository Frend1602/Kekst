const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeModalButton = document.querySelector('#upload-cancel');
const imgPrew = document.querySelector('.img-upload__preview img');
const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};
const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};
const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

//Открытие-закрытие окна

const closeModal = () => {
  uploadModal.classList.add('hidden'), body.classList.remove('modal-open'), uploadButton.value = '';

}

uploadButton.addEventListener('change', () => {
  resetSettings(); uploadModal.classList.remove('hidden'), body.classList.add('modal-open'), closeModalButton.addEventListener('click', () => { closeModal() }), document.addEventListener('keydown', (evt) => { if (evt.key === Keys.ESC || evt.key === Keys.ESCAPE) { closeModal() } });
});

//Задаём масштаб

const buttonSmal = document.querySelector('.scale__control--smaller');
const buttonBig = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');


buttonSmal.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) - Scale.STEP;
  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }
  scaleValue.value = scale + '%';
  scale = scale / 100;
  imgPrew.style.transform = 'scale(' + scale + ')';
})

buttonBig.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) + Scale.STEP;
  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }
  scaleValue.value = scale + '%';
  scale = scale / 100;
  imgPrew.style.transform = 'scale(' + scale + ')';
})

//Смена эффектов

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
let lastClass = '';

const resetSettings = () => {
  imgPrew.style = 'transform: scale(1.00)';
  imgPrew.style.filter = '';
  imgPrew.removeAttribute('class');
  if (lastClass) {
    imgPrew.classList.remove(lastClass);
  }

  scaleValue.value = '100%';
  effectLevel.classList.add('visually-hidden');
};

const slider = document.querySelector('.effect-level__slider');
const effectRadioGroup = document.querySelector('.img-upload__effects');

window.noUiSlider.create(slider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
});

slider.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];

});

const effects = {
  none: () => {
    effectLevel.classList.add('visually-hidden')
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('visually-hidden')
    return `grayscale(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  sepia: () => {
    effectLevel.classList.remove('visually-hidden')
    return `sepia(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    effectLevel.classList.remove('visually-hidden')
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },
  phobos: () => {
    effectLevel.classList.remove('visually-hidden')
    return `blur(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('visually-hidden')
    return `brightness(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
  },
};

const onEffectRadioGroupClick = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      imgPrew.classList.remove(lastClass);
    }
    slider.noUiSlider.set(100);
    let currentClass = evt.target.classList[1];
    lastClass = currentClass;

    imgPrew.classList.add(currentClass);
    imgPrew.style.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

effectRadioGroup.addEventListener('click', onEffectRadioGroupClick)

//Валидация хэштэгов
const comentValue = document.querySelector('.text__description')
const hashtags = document.querySelector('.text__hashtags');
hashtags.addEventListener('input',()=>{ 
  hashtags.setCustomValidity('');

  let inputText = hashtags.value.toLowerCase().trim();

  if (!inputText) {
    return;
  }

  let inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return;
  }

  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== '#';
  });
  if (isStartNotHashtag) {
    hashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');

  }

  const isOnlyLatticeHashtag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashtag) {
    hashtags.setCustomValidity('Хэш-тег не может состоять только из решетки')
  }

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    hashtags.setCustomValidity('Хэш-теги разделяются пробелами');
  }

  const isRepeatingHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatingHashtag) {
    hashtags.setCustomValidity('Хэш-теги не должны повторяться');
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > MAX_SYMBOLS;
  });
  if (isLongHashtag) {
    hashtags.setCustomValidity('Максимальная длина хэш-тега 20 символов, включая решетку');
  }

  if (inputArray.length > MAX_HASHTAGS) {
    hashtags.setCustomValidity('Максимум 5 хэш-тегов');
  }
})

const onEscapeDown = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}

hashtags.addEventListener('keydown', onEscapeDown)
comentValue.addEventListener('keydown', onEscapeDown)
