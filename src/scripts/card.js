const cardTemplate = document.querySelector('#card-template').content;

 export function createCard ({name, link}, likeCard, imagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = link; 
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
  cardElement.querySelector('.card__image').addEventListener('click', () => imagePopup({name, link}))
  return cardElement
}

function deleteCard(cardElement) {
  cardElement.remove(); 
}

 export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}