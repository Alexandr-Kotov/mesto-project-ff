const PATH = 'https://nomoreparties.co/v1/wff-cohort-17';
const authorization = '9aaee395-f8f2-4d4a-b4e6-15ee0def27d4';
const handleResponse = (res) => {
  if(res.ok){
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = () => {
  return fetch(`${PATH}/users/me`,{
    headers: {
      authorization: authorization
    }
  })
  .then(handleResponse)
}

export const getCards = () => {
  return fetch(`${PATH}/cards`, {
    headers: {
      authorization: authorization
    }
  })
  .then(handleResponse)
}

export const patchUser = (name, about) => {
  return fetch(`${PATH}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(name, about)
  })
  .then(handleResponse)
}

export const postCreateCard = (name, link) => {
  return fetch(`${PATH}/cards`, {
    method: 'POST',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(name, link)
  })
  .then(handleResponse)
}

export const deleteCardId = (cardId) => {
  return fetch(`${PATH}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorization
    }
  })
}

export const putLike = (cardId) => {
  return fetch(`${PATH}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: authorization
    }
  })
}

export const deleteLike = (cardId) => {
  return fetch(`${PATH}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorization
    }
  })
}

export const patchAvatar = (avatar) => {
  return fetch(`${PATH}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(avatar)
  })
  .then(handleResponse)
}