class Api {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL;
        this._urlDataProfile = `${this._baseURL}users/me`;
        this._urlCard = `${this._baseURL}cards`;
        this._urlAvatar = `${this._baseURL}users/me/avatar`;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(this._urlDataProfile, {
            headers: this._headers,
            credentials: 'include',
        }).then(res => this._getResponseData(res));
    } //Идентичен с запросом getDataProfile() снизу. Есть ли разница ? если есть то какие коррективы ввести ? 

    getDataProfile() {
        return fetch(this._urlDataProfile, {
            headers: this._headers,
            credentials: 'include',
        }).then(res => this._getResponseData(res));
    }

    getDataCard() {
        return fetch(this._urlCard, {
            headers: this._headers,
            credentials: 'include',
        }).then(res => this._getResponseData(res));
    }

    setUserInfo(obj) { //был sendDataProfile
        return fetch(this._urlDataProfile, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }

    sendDataAvatar(obj) {
        return fetch(this._urlAvatar, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }

    postCard = (obj) => {
        return fetch(this._urlCard, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',            
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }
    //Вывод функции через стрелочную чтобы при передаче данного метода в другой класс не терялся контекст this
    //Так же возможен вариант когда при передаче метода одного класса в другой класс
    //Закреплять this методом bind()
    deleteCard = (id) => {
        console.log(id);
        return fetch(`${this._urlCard}/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        }).then(res => this._getResponseData(res));

    }

    changeLikeCardStatus = (id, isLiked) => {
        return (isLiked) ? this.putLikes(id) : this.deleteLikes(id);
    }

    putLikes = (id) => {
        return fetch(`${this._urlCard}/${id}/likes`, {
            method: "PUT",
            credentials: 'include',
            headers: this._headers
        }).then(res => this._getResponseData(res));
    }

    deleteLikes = (id) => {
        return fetch(`${this._urlCard}/${id}/likes`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        }).then(res => this._getResponseData(res));
    }

   _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}  ${res.statusText}`);
        }
        return res.json();
    }

}

const apiData = {
    baseURL: 'https://domainsashaback.nomoredomains.icu/api/',
    headers: {
       // "Authorization": `Bearer ${localStorage.getItem('jwt')}`,    
        "Content-Type": "application/json" ,
    } 
};

/*baseURL: 'http://localhost:3000/',*/

export const api = new Api(apiData);