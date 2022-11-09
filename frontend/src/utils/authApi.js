const baseURL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${baseURL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => getResponseData(res))
}

export const authorize = (email, password) => {
    return fetch(`${baseURL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => getResponseData(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data
            }
        })
}

export const getContent = (jwt) => {
    return fetch(`${baseURL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(res => getResponseData(res))
}

//При ошибке с сервера мы отклоняем промис, чтобы ошибка не прошла дальше как нормальный ответ
function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}  ${res.statusText}`);
    }
    return res.json();
}