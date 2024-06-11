import '../pages/index.css';
import { initialCards, createCard } from './cards.js';
import { openModal } from './modal.js';

document.querySelector('.profile__add-button').addEventListener('click', ()=> openModal('.popup_type_new-card'))
document.querySelector('.profile__edit-button').addEventListener('click', ()=> openModal('.popup_type_edit'))
document.querySelector('.profile__image').addEventListener('click', ()=> openModal('.popup_type_image'))

const cardsContainer = document.querySelector('.places__list');

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element))
})