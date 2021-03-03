import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  openPopup = (src, name) => {
    this._popupPicture.src = src;
    this._popupPicture.alt = `Фото: ${name}`;
    this._popupCaption.textContent = name;
    
    super.openPopup();
  }
}