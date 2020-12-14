let likes = document.querySelectorAll('.element__caption-like');
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
}

let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let popupInputName = popup.querySelector('.popup__input-name');
let popupInputProfession = popup.querySelector('.popup__input-profession');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');
popupInputName.value = profileName.textContent;
popupInputProfession.value = profileProfession.textContent;

let profileEditBtn = profile.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', openPopup);

let popupCloseBtn = popup.querySelector('.popup__close-button');
popupCloseBtn.addEventListener('click', closePopup);

let popupSaveBtn = popup.querySelector('.popup__save-button');
popupSaveBtn.addEventListener('click', submitPopup);

function openPopup(){
  popup.classList.add('popup_opened');
}

function closePopup(evt){
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}
function submitPopup(evt){
  evt.preventDefault();
  let popupInputName = popup.querySelector('.popup__input-name');
  let popupInputProfession = popup.querySelector('.popup__input-profession');
  let profileName = profile.querySelector('.profile__name');
  let profileProfession = profile.querySelector('.profile__profession');
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;

  popup.classList.remove('popup_opened');
}