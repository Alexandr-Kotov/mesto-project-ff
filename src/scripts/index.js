import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard, openImagePopup } from './card.js';
import { openPopup, closePopup, setClosePopupEventListeners, handleFormSubmit, newCardFormSubmit } from './modal.js';
const cardsContainer = document.querySelector('.places__list');
const editPopup = document.querySelector(('.popup_type_edit'));
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPlaceForm = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

document.querySelector('.profile__add-button').addEventListener('click', ()=> {
  openPopup(newCardPopup);
  newPlaceForm.reset();
});

document.querySelector('.profile__edit-button').addEventListener('click', ()=> {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
});

document.querySelectorAll('.popup__close').forEach(function (item){
  item.addEventListener('click', function(){
    const popup = item.closest('.popup');
    closePopup(popup);
  });
})
setClosePopupEventListeners(newCardPopup);
setClosePopupEventListeners(editPopup);


editProfileForm.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newCardFormSubmit);

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element, likeCard, () => {
    openPopup(imagePopup)
    setClosePopupEventListeners(imagePopup)
    openImagePopup({name: element.name, link: element.link})}))
})