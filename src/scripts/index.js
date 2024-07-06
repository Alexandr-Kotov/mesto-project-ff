import '../pages/index.css';
import { createCard, likeCard, likes } from './card.js';
import { openPopup, closePopup, setClosePopupEventListeners } from './modal.js';
import { enableValidation } from './validation.js';
import { deleteCardId, deleteLike, getCards, getUser, patchAvatar, patchUser, postCreateCard, putLike } from './api.js';
const cardsContainer = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPlaceForm = document.querySelector('[name="new-place"]');
const avatarForm = document.querySelector('[name="edit-avatar"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image')
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const urlInputCard = document.querySelector('.popup__input_type_url');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarInput = document.querySelector('.popup__input_type_url-avatar');
const profileImage = document.querySelector('.profile__image');

function resetValidation () {
  document.querySelectorAll('.popup__input-error').forEach(function (error) {
    error.textContent = ''
  })
  document.querySelectorAll('.popup__button').forEach(function (button) {
    button.classList.add('popup__button_inactive')
  })
  document.querySelectorAll('.popup__input').forEach(function (input) {
    input.classList.remove('popup__input-error_active')
    input.classList.remove('popup__input_type_error')
  })
}

document.querySelector('.profile__image-container').addEventListener('click', ()=> {
  openPopup(avatarPopup);
  resetValidation();
  avatarForm.reset();
})

document.querySelector('.profile__add-button').addEventListener('click', ()=> {
  openPopup(newCardPopup);
  resetValidation();
  newPlaceForm.reset();
});

document.querySelector('.profile__edit-button').addEventListener('click', ()=> {
  openPopup(editPopup);
  resetValidation();
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
});

document.querySelectorAll('.popup__close').forEach(function (item){
  item.addEventListener('click', function(){
    const popup = item.closest('.popup');
    closePopup(popup);
  });
})

function renderLoading (isLoading) {
  document.querySelectorAll('.popup__button').forEach(function (item){
    if(isLoading){
      item.textContent = 'Сохранение...'
    }else{
      item.textContent = 'Сохранить'
    }
  })
}

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
setClosePopupEventListeners(avatarPopup)

function avatarFormSumit(evt) {
  evt.preventDefault();
  renderLoading(true)
  patchAvatar({avatar: avatarInput.value})
  .then((data) => {
    profileImage.src = data.avatar;   
    avatarForm.reset();
    closePopup(avatarPopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(()=>{
    renderLoading(false)
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  patchUser({name: nameInput.value, about: jobInput.value})
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about; 
    closePopup(editPopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(()=>{
    renderLoading(false)
  })
}

function newCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  postCreateCard({name: nameInputCard.value, link: urlInputCard.value})
  .then((data)=> {
    const newCard = createCard({
      name: data.name, link: data.link, likes: [], _id: data._id},
      likeCard,
      openImagePopup,
      false,
      deleteCardId,
      putLike,
      deleteLike,
    )
    cardsContainer.prepend(newCard);  
    newPlaceForm.reset();
    closePopup(newCardPopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(()=>{
    renderLoading(false)
  })
}

enableValidation({
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input-error_active'
})

editProfileForm.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newCardFormSubmit);
avatarForm.addEventListener('submit', avatarFormSumit);

getUser()
.then((data)=> {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
})
.catch((err) => {
  console.log(err)
})

Promise.all([getCards(), getUser()])
.then(([cards, user])=> {
  cards.forEach(function(element){
    cardsContainer.append(createCard(
      element, 
      likeCard, 
      openImagePopup, 
      element.owner._id !== user._id,
      deleteCardId, 
      putLike,
      deleteLike,
      user._id))
  })
})
.catch((err) => {
  console.log(err)
})