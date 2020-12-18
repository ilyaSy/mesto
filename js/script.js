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
let popupInputs = popup.querySelectorAll('.popup__input');
let profileName = profile.querySelector('.profile__name');
let profileProfession = profile.querySelector('.profile__profession');

// initialize fields in popup
popupInputs[0].value = profileName.textContent;
popupInputs[1].value = profileProfession.textContent;

// event: open popup
let profileEditBtn = profile.querySelector('.profile__edit-button');
profileEditBtn.addEventListener('click', openPopup);

// event: close popup
let popupCloseBtn = popup.querySelector('.popup__close-button');
popupCloseBtn.addEventListener('click', closePopup);

// event: click save
let popupSaveBtn = popup.querySelector('.popup__save-button');
popupSaveBtn.addEventListener('click', submitPopup);

// event: press enter
popupInputs[0].addEventListener('keypress', (evt) => { if (evt.key === 'Enter') submitPopup(evt)});
popupInputs[1].addEventListener('keypress', (evt) => { if (evt.key === 'Enter') submitPopup(evt)});

//open popup function 
function openPopup(){
  popup.classList.add('popup_opened');
}

//close popup function 
function closePopup(evt){
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

//save popup function 
function submitPopup(evt){
  evt.preventDefault();
  profileName.textContent = popupInputs[0].value;
  profileProfession.textContent = popupInputs[1].value;

  popup.classList.remove('popup_opened');
}