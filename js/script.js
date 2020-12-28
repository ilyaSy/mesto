const elementTmplt = document.querySelector('#element');
const elements = document.querySelector('.elements');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupShow = document.querySelector('.popup_type_show');
const popupEditForm = popupEdit.querySelector('.popup__container');
const popupAddForm = popupAdd.querySelector('.popup__container');
const popupInputName = popupEdit.querySelector('.popup__input_value_name');
const popupInputJob = popupEdit.querySelector('.popup__input_value_job');
const popupInputText = popupAdd.querySelector('.popup__input_value_text');
const popupInputSrc = popupAdd.querySelector('.popup__input_value_src');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-button');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-button');
const popupShowCloseBtn = popupShow.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileEditBtn = profile.querySelector('.profile__edit-button');
const profileAddBtn = profile.querySelector('.profile__add-button');

//create element
const createElement = card => {
  const element = elementTmplt.content.cloneNode(true);
  const picture = element.querySelector('.element__picture');
  picture.src = card.link;
  picture.alt = `Фото: ${card.name}`;
  element.querySelector('.element__caption-text').textContent = card.name;

  element.querySelector('.element__caption-like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__caption-like_active');
  });

  element.querySelector('.element__delete-button').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });

  picture.addEventListener('click', (event) => {openPopup(popupShow); initializeShowPopup(event)});
  
  return element;
}

//add element to section: elements
const addElement = element => {
  elements.prepend(element);
}

//initialize Cards
const initializeCards = cards => {
  if (cards.length > 0) {
    cards.forEach(card => {addElement(createElement(card))});
  }
  else {
    elements.textContent = 'Нет фотографий';
  }
}

//open popup function 
const openPopup = (popup) => {  
  popup.classList.add('popup_opened');
}

//popup: edit - initialize input fields
const initializeEditPopup = () => {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

//popup: add - initialize/clear input fields
const initializeAddPopup = () => {
  popupInputSrc.value = '';
  popupInputText.value = '';
}

//popup: show - initialize/set src, alt and caption from card
const initializeShowPopup = (event) => {
  const picture = event.target;
  const caption = picture.nextElementSibling.firstElementChild;
  const picturePopup = popupShow.querySelector('.popup__picture');
  picturePopup.src = picture.src;
  picturePopup.alt = picture.alt;
  popupShow.querySelector('.popup__caption').textContent = caption.textContent;
}

//close popup function 
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

//popup: edit - submit function
const submitPopupEdit = event => {
  event.preventDefault();

  if (popupInputName.value === '' || popupInputJob.value === ''){
    alert("все поля должны быть заполнены")
    return false;
  }

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup(popupEdit);
}

//popup: add - submit function
const submitPopupAdd = event => {
  event.preventDefault();  
  
  if (popupInputSrc.value === '' || popupInputText.value === ''){
    alert("все поля должны быть заполнены")
    return false;
  }

  const card = {
    link: popupInputSrc.value,
    name: popupInputText.value
  }
  addElement(createElement(card))

  closePopup(popupAdd);
}

//initialization
initializeCards(initialCards);

//add listeners
profileEditBtn.addEventListener('click', () => {openPopup(popupEdit); initializeEditPopup();});
profileAddBtn.addEventListener('click', () => {openPopup(popupAdd); initializeAddPopup();});
popupEditCloseBtn.addEventListener('click', () => {closePopup(popupEdit)});
popupAddCloseBtn.addEventListener('click', () => {closePopup(popupAdd)});
popupShowCloseBtn.addEventListener('click', () => {closePopup(popupShow)});
popupEditForm.addEventListener('submit', submitPopupEdit);
popupAddForm.addEventListener('submit', submitPopupAdd);
// popupInputName.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
// popupInputJob.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
// popupInputText.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
// popupInputSrc.addEventListener('keypress', (event) => {if (event.key === 'enter') {submitPopup}});
