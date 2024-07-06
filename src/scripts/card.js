const cardTemplate = document.querySelector('#card-template').content;

export function createCard ({name, link, likes, _id}, likeCard, imagePopup, userId, deleteCardId, putLike, deleteLike, user) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = link; 
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-counter').textContent = likes.length;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    deleteCard(cardElement); 
    deleteCardId(_id)
  });
  cardElement.querySelector('.card__like-button').addEventListener('click',  likeCard)
  cardElement.querySelector('.card__like-button').addEventListener('click',  function(evt){
      if(evt.target.classList.contains('card__like-button_is-active')){
        likes.length ++;
        putLike(_id)
      }else{
        likes.length --;
        deleteLike(_id)
      }
      cardElement.querySelector('.card__like-counter').textContent = likes.length;
    
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => imagePopup({name, link}))
  
  likes.forEach(element => {
    if(element._id === user){
      cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
    }
  })
  if(userId){
    cardElement.querySelector('.card__delete-button').remove();
  }
  return cardElement
}

function deleteCard(cardElement) {
  cardElement.remove(); 
}

export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}