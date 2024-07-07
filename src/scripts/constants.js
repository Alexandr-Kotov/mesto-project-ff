export const cardsContainer = document.querySelector('.places__list');
export const editPopup = document.querySelector('.popup_type_edit');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const captionPopup = imagePopup.querySelector('.popup__caption');
export const editProfileForm = document.forms["edit-profile"];
export const newPlaceForm = document.forms["new-place"];
export const avatarForm = document.forms["edit-avatar"];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image')
export const nameInputCard = document.querySelector('.popup__input_type_card-name');
export const urlInputCard = document.querySelector('.popup__input_type_url');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const avatarInput = document.querySelector('.popup__input_type_url-avatar');
export const profileImage = document.querySelector('.profile__image');
export const image = document.querySelector('.popup__image');
export const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input-error_active'
};