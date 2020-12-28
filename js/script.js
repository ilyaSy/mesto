const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let popupInputName = popup.querySelector('.popup__input_value_name');
let popupInputJob = popup.querySelector('.popup__input_value_job');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let profileEditBtn = profile.querySelector('.profile__edit-button');
let popupCloseBtn = popup.querySelector('.popup__close-button');

//initialize Cards
const initializeCards = cards => {
  const elements = document.querySelector('.elements');

  if (cards.length > 0) {
    cards.forEach(card => {
      const elementTmplt = document.querySelector('#element');
      const element = elementTmplt.content.cloneNode(true);
      element.querySelector('.element__picture').src = card.link;
      element.querySelector('.element__picture').alt = `Фото: ${card.name}`;
      element.querySelector('.element__caption-text').textContent = card.name;

      element.querySelector('.element__caption-like').addEventListener('click', (event) => {
        event.target.classList.toggle('element__caption-like_active');
      });

      element.querySelector('.element__delete-button').addEventListener('click', (event) => {
        event.target.closest('.element').remove();
      });
      
      elements.prepend(element);
    });
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//open popup function 
const openPopup = () => {
  popup.classList.add('popup_opened');

  // initialize fields in popup
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

//close popup function 
const closePopup = () => {
  popup.classList.remove('popup_opened');
}

//save popup function 
const submitPopup = evt => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup();
}

//initialization
initializeCards(initialCards);

//add listeners
profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitPopup);