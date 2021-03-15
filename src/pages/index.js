import './index.css';
// import initialCards from '../js/utils/config';
import Api from '../js/components/Api';
import FormValidator from '../js/components/FormValidator';
import Card from '../js/components/Card';
import PopupWithForm from '../js/components/PopupWithForm';
import PopupWithImage from '../js/components/PopupWithImage';
import Section from '../js/components/Section';
import UserInfo from '../js/components/UserInfo';
import {
  cardPopupTmplSelector,
  cardElementSelector,
  cardElement,
  cardPopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  validationObjects,
  popupInputName,
  popupInputJob,
  profileEditBtn,
  profileAddBtn,
  popupEditForm,
  popupAddForm,
  tokenAuth,
  tokenGroup,
  apiURL
} from '../js/utils/constants';

const api = new Api({
  tokenAuth: tokenAuth,
  tokenGroup: tokenGroup,
  apiURL: apiURL
});

//card popup
const popupCard = new PopupWithImage(cardPopupSelector)
popupCard.setEventListeners();

function createCard(card) {
  const cardElement = new Card({ card: card, cardSelector: cardPopupTmplSelector }, popupCard.openPopup, api.likeCard.bind(api));
  return cardElement.generate();
}

//main section object
const section = new Section({
  // items: initialCards,
  renderer: (card) => {
    const cardElement = createCard(card);
    
    section.addItem(cardElement)
  }
}, cardElementSelector);

//initialize Cards - no information
function initializeNoCards(){
  cardElement.textContent = 'Нет фотографий'
};

//initialize Cards
function initializeCards (initialCards) {
  console.log(initialCards)
  if (initialCards.length > 0) {
    section.renderItems(initialCards);
  }
  else {
    initializeNoCards();
  }
}

//main user Object
const user = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector);

//------------------           initialization        ---------------------
//get initial cards using API
api.getInitialCards()
  .then(initialCards => initializeCards(initialCards))
  .catch(initializeNoCards);

//get initial user info
api.getUserInfo()
  .then(data => {
    // console.log(data)
    user.id = data._id;
    user.setUserInfo({
      profileName: data.name,
      profileJob: data.about,
      avatar: data.avatar
    });
  });

//------------------       popup - user profile      ---------------------
const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: (event, userData) => {
    event.preventDefault();
    
    api.editUserInfo({
      name: userData.profileName,
      about: userData.profileJob
    })
      .then(data => {
        // console.log(data)
        user.setUserInfo({
          profileName: data.name,
          profileJob: data.about,
          avatar: data.avatar
        });
      })
    // user.setUserInfo(userData);
  
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

    api.addCard(card)
      .then(data => {
        // console.log(data)
        const cardElement = createCard(card);

        section.addItem(cardElement)

        popupAddCard.closePopup();
      })
  },
  handleInitialize: () => {
    validatePopupAddForm.initializeValidation();
  }
});

popupAddCard.setEventListeners();

//------------------       popup - confirmation      ---------------------
const popupConfirm = new PopupWithForm({popupSelector: '.popup_type_confirm',
  handleFormSubmit: (event, undefined) => { event.preventDefault(); return true},
  handleInitialize: () => {}
});

popupConfirm.setEventListeners();

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
