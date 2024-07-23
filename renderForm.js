import { addComment } from './addComent.js'
import { setAuthLinkListener } from './listeners.js'
import { user } from './main.js'

export function renderForm({ container }) {
    container.innerHTML = user
        ? `<div class="add-form">
          <input
          type="text"
          class="add-form-name" id ="name-input" value="${user.name}"
          placeholder="Введите ваше имя"
          readonly 
          />
          <textarea
          type="textarea"
          class="add-form-text" id ="text-input" value=""
          placeholder="Введите ваш коментарий"
          rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-form-button">Написать</button>
          </div>
          <div><button id="delete-button" class="delete-form-button">Удалить последний комментарий</button>
          </div>
        </div>`
        : `<div class = "form-auth"> Чтобы оставить коментарий, <a class="auth-link" href="#">авторизуйтесь</a> </div>`
    user
        ? addComment()
        : setAuthLinkListener({
              container: document.querySelector('.container'),
          })
}
