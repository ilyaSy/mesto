import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  openPopup = (src, name) => {
    const picturePopup = this._popup.querySelector('.popup__picture');
    picturePopup.src = src;
    picturePopup.alt = `Фото: ${name}`;
    this._popup.querySelector('.popup__caption').textContent = name;
    
    super.openPopup();
  }
}