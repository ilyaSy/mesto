export default class FormValidator {
  constructor(props, formElement) {
    this._formElement = formElement;
    this._inputSelector = props.inputSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._errorClass = props.errorClass;
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
  
  _hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true;
    }
    else{
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    
    inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  _initializeErrorFields() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
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