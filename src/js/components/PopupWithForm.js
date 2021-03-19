import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit = () => {}, handleInitialize = () => {}}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleInitialize = handleInitialize;
    this._form = this._popup.querySelector('.popup__container');
    this._submitButton = this._form.querySelector('.popup__save-button')
    this._submitButtonBaseText = this._submitButton.textContent;
  }

  openPopup = () => {
    this._handleInitialize();
    super.openPopup();
  }

  closePopup = () => {
    super.closePopup();
    this._form.reset();
  }

  setStartLoadingText = () => {this._submitButton.textContent = this._submitButtonBaseText + '...'};
  setStopLoadingText = () => {this._submitButton.textContent = this._submitButtonBaseText};

  _getInputValues = () => {
    this._inputList = this._form.querySelectorAll('.popup__input');
  
    this._formValues = {};  
    this._inputList.forEach(input => { this._formValues[input.name] = input.value });

    return this._formValues;
  }

  setEventListeners(handler){
    super.setEventListeners();
    handler && typeof handler === 'function' ?
      this._form.addEventListener('submit', handler) :
      this._form.addEventListener('submit', (event) => {this._handleFormSubmit(event, this._getInputValues())});
  }
}