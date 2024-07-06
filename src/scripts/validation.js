export const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement) => {
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement)
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })

  function hasInvalidInput (inputList) {
    return inputList.some((input) => {
      return !input.validity.valid
    })
  }

  function toggleButtonState (inputList, buttonElement) {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(inactiveButtonClass);
    }else{
      buttonElement.classList.remove(inactiveButtonClass)
    }
  }
}

export const clearValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
      formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        inputList.forEach((inputElement) => {
          const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
          const buttonElement = formElement.querySelector(submitButtonSelector);
          inputElement.classList.remove(inputErrorClass);
          errorElement.classList.remove(errorClass);
          errorElement.textContent = '';
          buttonElement.classList.add(inactiveButtonClass);
        })
  })
}