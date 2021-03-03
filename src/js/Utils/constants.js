export const cardElementSelector = '.elements';
export const cardPopupTmplSelector = '#element';
export const cardPopupSelector = '.popup_type_show';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
export const popupEditForm = popupEdit.querySelector('.popup__container');
export const popupAddForm = popupAdd.querySelector('.popup__container');
export const popupInputName = popupEdit.querySelector('.popup__input_value_name');
export const popupInputJob = popupEdit.querySelector('.popup__input_value_job');

const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-button');
export const profileAddBtn = profile.querySelector('.profile__add-button');

export const validationObjects = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};