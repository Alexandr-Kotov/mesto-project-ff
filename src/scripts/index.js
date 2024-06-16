import '../pages/index.css';
import { initialCards, createCard, likeCard } from './cards.js';
import { openModal, newCardFormSubmit, handleFormSubmit, formElement } from './modal.js';
const cardsContainer = document.querySelector('.places__list');

document.querySelector('.profile__add-button').addEventListener('click', ()=> openModal('.popup_type_new-card'));
document.querySelector('.profile__edit-button').addEventListener('click', ()=> openModal('.popup_type_edit'));
formElement[1].addEventListener('submit', newCardFormSubmit);
formElement[0].addEventListener('submit', handleFormSubmit);

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element, likeCard))
})