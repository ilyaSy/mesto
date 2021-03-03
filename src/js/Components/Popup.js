export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__close-button');
  }

  openPopup(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscapeBtn);
  }

  closePopup(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscapeBtn);
  }

  setEventListeners(){
    this._popupCloseBtn.addEventListener('click', this.closePopup.bind(this));
    this._popup.addEventListener('click', this._closeByClickOnOverlay);
  }

  _closeByEscapeBtn = event => {
    if (event.key === 'Escape') {
      this.closePopup.call(this);
    }
  }

  _closeByClickOnOverlay = event => {
    if (event.target.classList.contains('popup_opened')) {
      this.closePopup.call(this);
    }
  }
}