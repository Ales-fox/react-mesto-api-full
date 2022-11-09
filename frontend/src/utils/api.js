class Api {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL;
        this._urlDataProfile = `${this._baseURL}users/me/`;
        this._urlCard = `${this._baseURL}cards/`;
        this._urlAvatar = `${this._baseURL}users/me/avatar/`;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(this._urlDataProfile, {
            headers: this._headers
        }).then(res => this._getResponseData(res));
    } //Идентичен с запросом getDataProfile() снизу. Есть ли разница ? если есть то какие коррективы ввести ? 

    getDataProfile() {
        return fetch(this._urlDataProfile, {
            headers: this._headers
        }).then(res => this._getResponseData(res));
    }

    getDataCard() {
        return fetch(this._urlCard, {
            headers: this._headers
        }).then(res => this._getResponseData(res));
    }

    setUserInfo(obj) { //был sendDataProfile
        return fetch(this._urlDataProfile, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }

    sendDataAvatar(obj) {
        return fetch(this._urlAvatar, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }

    postCard = (obj) => {
        return fetch(this._urlCard, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(obj),
        }).then(res => this._getResponseData(res));
    }
    //Вывод функции через стрелочную чтобы при передаче данного метода в другой класс не терялся контекст this
    //Так же возможен вариант когда при передаче метода одного класса в другой класс
    //Закреплять this методом bind()
    deleteCard = (id) => {
        return fetch(`${this._urlCard}${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => this._getResponseData(res));

    }

    changeLikeCardStatus = (id, isLiked) => {
        return (isLiked) ? this.putLikes(id) : this.deleteLikes(id);
    }

    putLikes = (id) => {
        return fetch(`${this._urlCard}${id}/likes`, {
            method: "PUT",
            headers: this._headers
        }).then(res => this._getResponseData(res));
    }

    deleteLikes = (id) => {
        return fetch(`${this._urlCard}${id}/likes`, {
            method: "DELETE",
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
    baseURL: 'https://nomoreparties.co/v1/cohort-46/',
    headers: {
        authorization: '13749ec2-245f-4fcd-8f22-451e84bec66b',
        'Content-Type': 'application/json'
    }
};

export const api = new Api(apiData);