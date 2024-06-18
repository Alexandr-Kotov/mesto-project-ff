import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, likeCard } from './card.js';
import { openPopup, closePopup, setClosePopupEventListeners } from './modal.js';
const cardsContainer = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPlaceForm = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const urlInputCard = document.querySelector('.popup__input_type_url');

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

function openImagePopup ({name, link}) {
  openPopup(imagePopup);
  const image = document.querySelector('.popup__image');
  image.src = link;
  image.alt = name;
  imagePopup.querySelector('.popup__caption').textContent = name;
}

setClosePopupEventListeners(newCardPopup);
setClosePopupEventListeners(editPopup);
setClosePopupEventListeners(imagePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

function newCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: nameInputCard.value, link: urlInputCard.value},
    likeCard,
    openImagePopup
  )
  cardsContainer.prepend(newCard);
  newPlaceForm.reset();
  closePopup(newCardPopup);
}

editProfileForm.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newCardFormSubmit);

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element, likeCard, openImagePopup));
})