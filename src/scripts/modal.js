import { createCard, likeCard } from "./cards";
const formElement = document.querySelectorAll('.popup__form');
const nameInput = formElement[0].querySelector('.popup__input_type_name');
const jobInput = formElement[0].querySelector('.popup__input_type_description');
const nameInputCard = formElement[1].querySelector('.popup__input_type_card-name');
const urlInputCard = formElement[1].querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function openModal(element) {
  document.querySelector(element).classList.add('popup_is-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  document.querySelectorAll('.popup__close').forEach((el)=> {
  el.addEventListener('click', (e)=>{
    closeModal(element);
    })
  });
  closeModalOverlay(element);
  closeModalEsc(element);
};

function closeModal(element) {
  document.querySelector(element).classList.remove('popup_is-opened');
  formElement[0].reset();
  formElement[1].reset();
}

function closeModalOverlay (element) {
  document.querySelector(element).addEventListener('click', (evt) => {
    if(evt.target === document.querySelector(element)){
      closeModal(element);
    }
  })
}

function closeModalEsc (element) {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      closeModal(element);
    }
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal('.popup_type_edit');
}

function newCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard( {name: nameInputCard.value, link: urlInputCard.value}, likeCard ));
  formElement[1].reset();
  closeModal('.popup_type_new-card');
}

export { openModal, handleFormSubmit, newCardFormSubmit, formElement }