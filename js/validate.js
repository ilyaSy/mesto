const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(errorClass.inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass.errorElement);
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(errorClass.inputElement);
  errorElement.classList.remove(errorClass.errorElement);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, errorClass) => {
  !inputElement.validity.valid ?
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass) :
    hideInputError(formElement, inputElement, errorClass);
};

const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, inactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass)
    buttonElement.disabled = true;
  }
  else{
    buttonElement.classList.remove(inactiveClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, validationObjects) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObjects.inputSelector));
  const buttonElement = formElement.querySelector(validationObjects.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    const errorClass = {
      inputElement: validationObjects.inputErrorClass,
      errorElement: validationObjects.errorClass,
    };

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorClass);
      toggleButtonState(inputList, buttonElement, validationObjects.inactiveButtonClass);
    });
  });
};

const initializeErrorFields = (formElement, validationObjects) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObjects.inputSelector));
  const buttonElement = formElement.querySelector(validationObjects.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObjects.inactiveButtonClass);
  
  inputList.forEach((inputElement) => {
    const errorClass = {
      inputElement: validationObjects.inputErrorClass,
      errorElement: validationObjects.errorClass,
    };
    hideInputError(formElement, inputElement, errorClass);
  });
}

// validationOptions
// {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }

const initializeValidation = validationObjects => {
  const formList = Array.from(document.querySelectorAll(validationObjects.formSelector));
  formList.forEach((formElement) => {    
    initializeErrorFields(formElement, validationObjects)
  });
}

const enableValidation = validationObjects => {
  const formList = Array.from(document.querySelectorAll(validationObjects.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationObjects);
  });
};