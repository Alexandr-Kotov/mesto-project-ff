import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard ({name, link}, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = link; 
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
  cardElement.querySelector('.card__image').addEventListener('click', () => popupCard({name, link}))
  return cardElement
}

function deleteCard(cardElement) {
  cardElement.remove(); 
}

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function popupCard ({name, link}) {
  openModal('.popup_type_image')
  document.querySelector('.popup__image').src = link;
  document.querySelector('.popup__caption').textContent = name;
}

export { initialCards, createCard, likeCard }