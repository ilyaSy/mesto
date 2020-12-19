/*let likes = document.querySelectorAll('.element__caption-like');
for (let i = 0; i < likes.length; i++) {
  likes[i].addEventListener('mouseover', function(){
    if (!likes[i].classList.contains('element__caption-like_active')) {
      likes[i].classList.add('element__caption-like_hover');
    }
  })

  likes[i].addEventListener('mouseout', function(){
    if (likes[i].classList.contains('element__caption-like_hover')) {
      likes[i].classList.remove('element__caption-like_hover');
    }
  })

  likes[i].addEventListener('click', function(){
    likes[i].classList.toggle('element__caption-like_active');
    likes[i].classList.contains('element__caption-like_hover') ?
      likes[i].classList.remove('element__caption-like_hover') :
      likes[i].classList.add('element__caption-like_hover');
  })
}*/

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let popupInputName = popup.querySelector('.popup__input_value_name');
let popupInputJob = popup.querySelector('.popup__input_value_job');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let profileEditBtn = profile.querySelector('.profile__edit-button');
let popupCloseBtn = popup.querySelector('.popup__close-button');

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

//Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
//разве submit - не глагол ?
//save popup function 
const submitPopup = evt => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup();
}

//add listeners
profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitPopup);