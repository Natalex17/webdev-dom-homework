import { comments } from './main.js'
import { renderComments } from './render.js'
import { renderLogin } from './renderLogin.js'

export function likeEvent() {
    //Находит элементы с классом Лайкес в разметке
    const likes = document.querySelectorAll('.like-button')
    //цик фор проходит по каждому элем. в списке
    for (const likeElement of likes) {
        //Добовляет обработчик клика на конкретный элемент в списке
        likeElement.addEventListener('click', (e) => {
            e.stopPropagation()

            const index = likeElement.dataset.index
            const direction = comments[index].isLiked ? -1 : 1
            comments[index].like += direction
            comments[index].isLiked = !comments[index].isLiked
            renderComments()
        })
    }
}

export function answerComment() {
    const textInEl = document.getElementById('text-input')
    const commentHTML = document.querySelectorAll('.comment')
    commentHTML.forEach((el, i) => {
        el.addEventListener('click', () => {
            textInEl.value = `QUOTE_BEGIN>${comments[i].name}\n ${comments[i].text}QUOTE_END` //выводи соментарий и имя на которое будем отвечать \n -перенос на другую строку
        })
    })
}

function deleteComment({ id }) {
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const id = deleteButton.dataset.id

        return fetch(
            'https://wedev-api.sky.pro/api/v1/nataly-alpatova/comments',
            {
                method: 'DELETE',
            }
        ).then((response) => {
            response.json().then(() => {
                getComments()
            })
        })
    })
}
export function setAuthLinkListener({ container }) {
    const authLink = document.querySelector('.auth-link')
    authLink.addEventListener('click', () => {
        renderLogin({
            container,
        })
    })
}

//удаление элементов списка:
// 1. добавить в разметку кнопку "удалить"
// 2. добавить на кнопки удаления обработчик клика
// 3. реализовать внутри обработчика удаления элементов
