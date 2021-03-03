import './index.css';
import initialCards from '../js/utils/config';
import FormValidator from '../js/components/FormValidator';
import Card from '../js/components/Card';
import PopupWithForm from '../js/components/PopupWithForm';
import PopupWithImage from '../js/components/PopupWithImage';
import Section from '../js/components/Section';
import UserInfo from '../js/components/UserInfo';
import {
  cardPopupTmplSelector,
  cardElementSelector,
  cardPopupSelector,
  profileNameSelector,
  profileJobSelector,
  validationObjects,
  popupInputName,
  popupInputJob,
  profileEditBtn,
  profileAddBtn,
  popupEditForm,
  popupAddForm
} from '../js/utils/constants';

//card popup
const popupCard = new PopupWithImage(cardPopupSelector)
popupCard.setEventListeners();

function createCard(card) {
  const cardElement = new Card({ card: card, cardSelector: cardPopupTmplSelector }, popupCard.openPopup);
  return cardElement.generate(cardElement);
}

//main section object
const section = new Section({
  items: initialCards, 
  renderer: (card) => {
    // popupCard.setEventListeners();

    const cardElement = createCard(card);

    //cardElement.generate и есть так функция createCard о которой вы говорите
    section.addItem(cardElement)
  }
}, cardElementSelector);

//initialize Cards
const initializeCards = () => {
  if (initialCards.length > 0) {
    section.renderItems();
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//------------------       popup - user profile      ---------------------
const user = new UserInfo(profileNameSelector, profileJobSelector);
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit',

  handleFormSubmit: (event, userData) => {
    event.preventDefault();
    
    user.setUserInfo(userData);
  
    popupProfile.closePopup();
  },
  handleInitialize: () => {
    const {profileName: name, profileJob: job} = user.getUserInfo();
    popupInputName.value = name;
    popupInputJob.value = job;

    validatePopupEditForm.initializeValidation();
  }
});

popupProfile.setEventListeners();

//------------------       popup - add new card      ---------------------
const popupAddCard = new PopupWithForm({popupSelector: '.popup_type_add',
  handleFormSubmit: (event, card) => {
    event.preventDefault();

    const cardElement = createCard(card);

    //cardElement.generate и есть так функция createCard о которой вы говорите
    section.addItem(cardElement)

    popupAddCard.closePopup();
  },
  handleInitialize: () => {
    validatePopupAddForm.initializeValidation();
  }
});

popupAddCard.setEventListeners();

//initialization
initializeCards();

//enable form fields validation
const validatePopupEditForm = new FormValidator(validationObjects, popupEditForm);
validatePopupEditForm.initializeValidation();
validatePopupEditForm.enableValidation();

const validatePopupAddForm = new FormValidator(validationObjects, popupAddForm);
validatePopupAddForm.initializeValidation();
validatePopupAddForm.enableValidation();

//add listeners
profileEditBtn.addEventListener('click', popupProfile.openPopup);
profileAddBtn.addEventListener('click', popupAddCard.openPopup);
