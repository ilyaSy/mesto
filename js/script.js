import {initialCards} from './config.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupAddClassName = 'popup_type_add';
const popupEditClassName = 'popup_type_edit';

const elements = document.querySelector('.elements');
const popupEdit = document.querySelector(`.${popupEditClassName}`);
const popupAdd = document.querySelector(`.${popupAddClassName}`);
const popupEditForm = popupEdit.querySelector('.popup__container');
const popupAddForm = popupAdd.querySelector('.popup__container');
const popupInputName = popupEdit.querySelector('.popup__input_value_name');
const popupInputJob = popupEdit.querySelector('.popup__input_value_job');
const popupInputText = popupAdd.querySelector('.popup__input_value_text');
const popupInputSrc = popupAdd.querySelector('.popup__input_value_src');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-button');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileEditBtn = profile.querySelector('.profile__edit-button');
const profileAddBtn = profile.querySelector('.profile__add-button');

const validationObjects = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//add element to section: elements
const addElement = element => {
  elements.prepend(element);
}

//initialize Cards
const initializeCards = cards => {
  if (cards.length > 0) {
    cards.forEach(card => {
      const cardElement = new Card({
        card: card,
        cardSelector: "#element",
        openPopup: openPopup,
        closePopup: closePopup,
        closeByClickOnOverlay: closeByClickOnOverlay
      });

      addElement(cardElement.generate())
    });
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//popup: close it by click on overlay
const closeByClickOnOverlay = (event) => {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

//open popup function 
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', event => {if (event.key === 'Escape') closePopup(popup)}, {once: true});
}

//close popup function 
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

//popup: edit - initialize input fields
const initializeEditPopup = () => {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  validatePopupEditForm.initializeValidation();
}

//popup: add - initialize/clear input fields
const initializeAddPopup = () => {
  popupInputSrc.value = '';
  popupInputText.value = '';
  validatePopupAddForm.initializeValidation();
}

//popup: edit - submit function
const submitPopupEdit = event => {
  event.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup(popupEdit);
}

//popup: add - submit function
const submitPopupAdd = event => {
  event.preventDefault();  
  
  const card = {
    link: popupInputSrc.value,
    name: popupInputText.value
  }

  const cardElement = new Card({
    card: card,
    cardSelector: "#element",
    openPopup: openPopup,
    closePopup: closePopup,
    closeByClickOnOverlay: closeByClickOnOverlay
  });

  addElement(cardElement.generate())

  closePopup(popupAdd);
}

//initialization
initializeCards(initialCards);

//enable form fields validation
const validatePopupEditForm = new FormValidator(validationObjects, popupEditForm);
validatePopupEditForm.initializeValidation();
validatePopupEditForm.enableValidation();

const validatePopupAddForm = new FormValidator(validationObjects, popupAddForm);
validatePopupAddForm.initializeValidation();
validatePopupAddForm.enableValidation();

//add listeners
profileEditBtn.addEventListener('click', () => {openPopup(popupEdit); initializeEditPopup();});
profileAddBtn.addEventListener('click', () => {openPopup(popupAdd); initializeAddPopup();});
popupEditCloseBtn.addEventListener('click', () => {closePopup(popupEdit)});
popupAddCloseBtn.addEventListener('click', () => {closePopup(popupAdd)});
popupEditForm.addEventListener('submit', submitPopupEdit);
popupAddForm.addEventListener('submit', submitPopupAdd);

//add close popup listener (click)
popupAdd.addEventListener('click', closeByClickOnOverlay);
popupEdit.addEventListener('click', closeByClickOnOverlay);