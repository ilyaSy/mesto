export default class Api{
  constructor({tokenAuth, tokenGroup, apiURL}){
    this._apiURL = `${apiURL}/${tokenGroup}`;
    this._headers = { 
      authorization: tokenAuth,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards(){
    return fetch(`${this._apiURL}/cards`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getInitialCards'))
      // .catch(this._handleApiError)
  }

  addCard(cardData){
    return fetch(`${this._apiURL}/cards`, {method: 'POST', headers: this._headers, body: JSON.stringify(cardData)})
      .then(this._handleApiResult.bind(null, 'addCard'))
      // .catch(this._handleApiError)
  }
  
  likeCard(cardId, isLiked){
    return fetch(`${this._apiURL}/cards/likes/${cardId}`, {method: isLiked ? 'DELETE' : 'PUT', headers: this._headers})
      .then(this._handleApiResult.bind(null, 'likeCard'))
      // .catch(this._handleApiError)
  }

  deleteCard(cardId){
    return fetch(`${this._apiURL}/cards/${cardId}`, {method: 'DELETE', headers: this._headers,})
      .then(this._handleApiResult.bind(null, 'deleteCard'))
      // .catch(this._handleApiError)
  }

  editUserInfo(userData){
    return fetch(`${this._apiURL}/users/me`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(userData)})
      .then(this._handleApiResult.bind(null, 'editUserInfo'))
      // .catch(this._handleApiError)
  } 

  getUserInfo(){
    return fetch(`${this._apiURL}/users/me`, {headers: this._headers})
      .then(this._handleApiResult.bind(null, 'getUserInfo'))
      // .catch(this._handleApiError)
  }

  setUserAvatar(avatar){
    return fetch(`${this._apiURL}/users/me/avatar`, {method: 'PATCH', headers: this._headers, body: JSON.stringify(avatar)})
      .then(this._handleApiResult.bind(null, 'setUserAvatar'))
      // .catch(this._handleApiError)
  }

  _handleApiResult(fnName, res){
    return res.ok ? res.json() : Promise.reject(`Ошибка получения результата в ${fnName}: ${res.status} ${res.statusText}`);
  }

  // _handleApiError = err => console.log(`Ошибка: ${err}`)
}