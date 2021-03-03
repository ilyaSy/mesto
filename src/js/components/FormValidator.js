export default class FormValidator {
  constructor(props, formElement) {
    this._formElement = formElement;
    this._inputSelector = props.inputSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._errorClass = props.errorClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement) {
    !inputElement.validity.valid ?
      this._showInputError(inputElement, inputElement.validationMessage) :
      this._hideInputError(inputElement);
  };
  
  _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true;
    }
    else{
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  
  _setEventListeners() {    
    this._inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  
  _initializeErrorFields() {
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  
  initializeValidation() {
    this._initializeErrorFields()
  }
  
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
}