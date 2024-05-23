const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deletCard);
  return cardElement
}

function deletCard (event) {
  const deletElement = event.target.closest('.card')
  deletElement.remove();
}

initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element))
})