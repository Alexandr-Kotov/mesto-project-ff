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