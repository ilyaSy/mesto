import './pages/index.css';
import initialCards from './js/Utils/config';
import FormValidator from './js/Components/FormValidator';
import Card from './js/Components/Card';
import PopupWithForm from './js/Components/PopupWithForm';
import PopupWithImage from './js/Components/PopupWithImage';
import Section from './js/Components/Section';
import UserInfo from './js/Components/UserInfo';
import {
  cardPopupTmplSelector,
  cardElementSelector,
  cardPopupSelector,
  profileNameSelector,
  profileJobSelector,
  validationObjects,
  popupInputName,
  popupInputJob,
  popupInputSrc,
  popupInputText,
  profileEditBtn,
  profileAddBtn,
  popupEditForm,
  popupAddForm
} from './js/Utils/constants';

//initialize Cards
const initializeCards = cards => {
  if (cards.length > 0) {
    const section = new Section({
      items: cards, 
      renderer: (card) => {
        const popupCard = new PopupWithImage(cardPopupSelector)
        popupCard.setEventListeners();

        const cardElement = new Card({ card: card, cardSelector: cardPopupTmplSelector }, popupCard.openPopup);

        section.addItem(cardElement.generate())
      }
    }, cardElementSelector);

    section.renderItems();
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//------------------       popup - user profile      ---------------------
const user = new UserInfo(profileNameSelector, profileJobSelector);
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: (event) => {
    event.preventDefault();
    
    user.setUserInfo(popupProfile._getInputValues());
  
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
  handleFormSubmit: (event) => {
    event.preventDefault();

    const cardElement = new Card({ card: popupAddCard._getInputValues(), cardSelector: cardPopupTmplSelector });

    const section = new Section({}, cardElementSelector);
    section.addItem(cardElement.generate())

    popupAddCard.closePopup();
  },
  handleInitialize: () => {
    popupInputSrc.value = '';
    popupInputText.value = '';
    validatePopupAddForm.initializeValidation();
  }
});

popupAddCard.setEventListeners();

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
profileEditBtn.addEventListener('click', popupProfile.openPopup);
profileAddBtn.addEventListener('click', popupAddCard.openPopup);
