const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '9aaee395-f8f2-4d4a-b4e6-15ee0def27d4',
    'Content-Type': 'application/json',
  },
}

const handleResponse = (res) => {
  if(res.ok){
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers
  })
  .then(handleResponse)
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}

export const patchUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(name, about)
  })
  .then(handleResponse)
}

export const postCreateCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(name, link)
  })
  .then(handleResponse)
}

export const deleteCardId = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

export const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatar)
  })
  .then(handleResponse)
}