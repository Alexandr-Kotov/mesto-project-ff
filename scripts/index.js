const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = element.link; 
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  return cardElement
}

function deleteCard(cardElement) {  
  cardElement.remove(); 
}

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element))
})