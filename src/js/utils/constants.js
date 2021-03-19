export const cardElementSelector = '.elements';
export const cardElement = document.querySelector(cardElementSelector);
export const cardPopupTmplSelector = '#element';
export const cardPopupSelector = '.popup_type_show';
export const confirmPopupSelector = '.popup_type_confirm';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const profileAvatarSelector = '.profile__avatar';
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupAva = document.querySelector('.popup_type_ava');
export const popupEditForm = popupEdit.querySelector('.popup__container');
export const popupAddForm = popupAdd.querySelector('.popup__container');
export const popupAvaForm = popupAva.querySelector('.popup__container');
export const popupInputName = popupEdit.querySelector('.popup__input_value_name');
export const popupInputJob = popupEdit.querySelector('.popup__input_value_job');

//card buttons
export const deleteButtonSelector = '.element__delete-button';
export const deleteButtonDisactiveSelector = 'element__delete-button_disactive';
export const likeButtonSelector = '.element__caption-like';
export const likeButtonActiveSelector = 'element__caption-like_active';

//profile && add card
const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-button');
export const profileEditAvaBtn = profile.querySelector('.profile__edit-ava-button');
export const profileAddBtn = profile.querySelector('.profile__add-button');

//validation data
export const validationObjects = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//api data
export const tokenAuth = '30b18b22-df4e-456d-bb26-16cda3a69c12';
export const tokenGroup = 'cohort-21';
export const apiURL = 'https://mesto.nomoreparties.co/v1';