const editProfileForm = document.querySelector('[name="edit-profile"]');
const newPlaceForm = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const urlInputCard = document.querySelector('.popup__input_type_url');
const cardsContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
};
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(event) {
  if(event.key === 'Escape') {
     closePopup(document.querySelector('.popup_is-opened'));
  }
}

export function setClosePopupEventListeners(popupElement) {
  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popupElement);
    }
  });
};

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(document.querySelector('.popup_type_edit'));
}

export function newCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard( {name: nameInputCard.value, link: urlInputCard.value}, likeCard ));
  newPlaceForm.reset();
  closePopup(document.querySelector('.popup_type_new-card'));
}