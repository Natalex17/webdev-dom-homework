import { renderComments } from './render.js'

const host = 'https://wedev-api.sky.pro/api/v2/nataly-alpatova/comments'

export function getCom(token) {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then((response) => {
        if (response.status === 401) {
            // token = prompt("Введите верный пароль");
            // getCom();
            //renderComments();
            throw new Error('Нет авторизации')
        }

        return response.json()
    })
}

export function postCom({ name, text, token }) {
    return fetch(host, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
        }),
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then((response) => {
        //console.log(response);
        // if (response.status === 400) {
        // throw new Error ("Неверный запрос")

        //}
        //if (response.status === 500) {
        //Код который обрабатывает ошибку
        //throw new Error ("Сервер не отвечает");
        //}
        //else {
        return response.json()
        //   }
    })
}

//let password = prompt ("Введите пароль");

export function login({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Был передан неверный логин или пароль.')
        }
        return response.json()
    })
}
