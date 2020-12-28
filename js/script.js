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

let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupShow = document.querySelector('.popup_type_show');
let popupEditForm = popupEdit.querySelector('.popup__container');
let popupAddForm = popupAdd.querySelector('.popup__container');
let popupInputName = popupEdit.querySelector('.popup__input_value_name');
let popupInputJob = popupEdit.querySelector('.popup__input_value_job');
let popupInputText = popupAdd.querySelector('.popup__input_value_text');
let popupInputSrc = popupAdd.querySelector('.popup__input_value_src');
let popupEditCloseBtn = popupEdit.querySelector('.popup__close-button');
let popupAddCloseBtn = popupAdd.querySelector('.popup__close-button');
let popupShowCloseBtn = popupShow.querySelector('.popup__close-button');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let profileEditBtn = profile.querySelector('.profile__edit-button');
let profileAddBtn = profile.querySelector('.profile__add-button');

//add element to section
const createElement = card => {
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

  element.querySelector('.element__picture').addEventListener('click', (event) => {openPopup(popupShow, event)});
  
  return element;
}

//initialize Cards
const initializeCards = cards => {
  const elements = document.querySelector('.elements');

  if (cards.length > 0) {
    cards.forEach(card => {elements.prepend(createElement(card))});
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//open popup function 
const openPopup = (popup, event) => {  
  popup.classList.add('popup_opened');

  if (popup.classList.contains('popup_type_edit')) {
    // initialize fields in popup edit profile
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
  }
  else if (popup.classList.contains('popup_type_add')) {
    // initialize fields in popup add card
    popupInputSrc.value = '';
    popupInputText.value = '';
  }
  else if (popup.classList.contains('popup_type_show')) {
    const picture = event.target;
    const element = picture.closest('.element');
    const caption = element.querySelector('.element__caption-text');
    popup.querySelector('.popup__picture').src = picture.src;
    popup.querySelector('.popup__picture').alt = picture.alt;
    popup.querySelector('.popup__caption').textContent = caption.textContent;
  }
}

//close popup function 
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

//save popup function 
const submitPopup = event => {
  event.preventDefault();

  const popup = event.target.closest('.popup');
  if ( popup.classList.contains('popup_type_edit') ) {
    if (popupInputName.value === '' || popupInputJob.value === ''){
      alert("все поля должны быть заполнены")
      return false;
    }

    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
  }
  else if (popup.classList.contains('popup_type_add')) {
    if (popupInputSrc.value === '' || popupInputText.value === ''){
      alert("все поля должны быть заполнены")
      return false;
    }

    const card = {
      link: popupInputSrc.value,
      name: popupInputText.value
    }
    const elements = document.querySelector('.elements');
    elements.prepend(createElement(card))
  }

  closePopup(popup);
}

//initialization
initializeCards(initialCards);

//add listeners
profileEditBtn.addEventListener('click', () => {openPopup(popupEdit)});
profileAddBtn.addEventListener('click', () => {openPopup(popupAdd)});
popupEditCloseBtn.addEventListener('click', () => {closePopup(popupEdit)});
popupAddCloseBtn.addEventListener('click', () => {closePopup(popupAdd)});
popupShowCloseBtn.addEventListener('click', () => {closePopup(popupShow)});
popupEditForm.addEventListener('submit', submitPopup);
popupAddForm.addEventListener('submit', submitPopup);
popupInputName.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
popupInputJob.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
popupInputText.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
popupInputSrc.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});