const cardTemplate = document.querySelector('#card-template').content;

export function createCard (element, likeCard, imagePopup, userId, deleteCardId, putLike, deleteLike, user) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const carLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = element.link; 
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardLikeCounter.textContent = element.likes.length;
  cardDeleteButton.addEventListener('click', function() {
    deleteCard(cardElement); 
    deleteCardId(element._id)
  });
  carLikeButton.addEventListener('click',  (evt) => {
      if(!evt.target.classList.contains('card__like-button_is-active')){
        putLike(element._id) 
        .then((data)=> {
          cardLikeCounter.textContent = data.likes.length;
          likeCard(evt)
        });
      }else{
        deleteLike(element._id)
        .then((data)=> {
          cardLikeCounter.textContent = data.likes.length;
          likeCard(evt)
        });
      }
  });
  cardImage.addEventListener('click', () => imagePopup({name: element.name, link: element.link}))
  
  element.likes.forEach(item => {
    if(item._id === user){
      carLikeButton.classList.add('card__like-button_is-active')
    }
  })
  if(userId){
    cardDeleteButton.remove();
  }
  return cardElement
}

function deleteCard(cardElement) {
  cardElement.remove(); 
}

export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}