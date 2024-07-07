import '../pages/index.css';
import { createCard, likeCard } from './card.js';
import { openPopup, closePopup, setClosePopupEventListeners } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { deleteCardId, deleteLike, getCards, getUser, patchAvatar, patchUser, postCreateCard, putLike } from './api.js';
import { handleSubmit, renderLoading } from './utils.js';
import { cardsContainer, editPopup, newCardPopup, imagePopup, captionPopup, editProfileForm, newPlaceForm, avatarForm, nameInput,
  jobInput, profileTitle, profileDescription, profileAvatar, nameInputCard, urlInputCard, avatarPopup, avatarInput, profileImage,
  image, validationConfig } from './constants.js';

function openImagePopup ({name, link}) {
  openPopup(imagePopup);
  image.src = link;
  image.alt = name;
  captionPopup.textContent = name;
}

function  avatarFormSubmit (evt) {
  function makeRequestAvatr (){
    return patchAvatar({avatar: avatarInput.value}).then((user) => {
      profileImage.src = user.avatar;   
      avatarForm.reset();
      closePopup(avatarPopup);
    })
  }
  handleSubmit(makeRequestAvatr, evt, renderLoading);
}

function  profileFormSubmit (evt) {
  function makeRequestProfile (){
    return patchUser({name: nameInput.value, about: jobInput.value})
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about; 
      closePopup(editPopup);
    })
  }
  handleSubmit(makeRequestProfile, evt, renderLoading);
}

function  newCardFormSubmit (evt) {
  function makeRequestNewCard (){
    return postCreateCard({name: nameInputCard.value, link: urlInputCard.value})
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
  }
  handleSubmit(makeRequestNewCard, evt, renderLoading);
}

document.querySelector('.profile__image-container').addEventListener('click', ()=> {
  avatarForm.reset();
  clearValidation(validationConfig)
  openPopup(avatarPopup);
})

document.querySelector('.profile__add-button').addEventListener('click', ()=> {
  newPlaceForm.reset();
  clearValidation(validationConfig)
  openPopup(newCardPopup);
});

document.querySelector('.profile__edit-button').addEventListener('click', ()=> {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
  clearValidation(validationConfig)
  openPopup(editPopup);
});

document.querySelectorAll('.popup__close').forEach(function (item){
  item.addEventListener('click', function(){
    const popup = item.closest('.popup');
    closePopup(popup);
  });
})

setClosePopupEventListeners(newCardPopup);
setClosePopupEventListeners(editPopup);
setClosePopupEventListeners(imagePopup);
setClosePopupEventListeners(avatarPopup);
editProfileForm.addEventListener('submit', profileFormSubmit);
newPlaceForm.addEventListener('submit', newCardFormSubmit);
avatarForm.addEventListener('submit', avatarFormSubmit);
enableValidation(validationConfig);

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
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
})
.catch((err) => {
  console.log(err);
})