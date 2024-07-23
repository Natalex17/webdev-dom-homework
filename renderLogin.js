import { login } from './api.js'
import { setUser } from './main.js'
import { renderMainPage } from './renderMainPage.js'

export function renderLogin({ container }) {
    container.innerHTML = ` <div class="form">
        <div class="add-form">
        <h3 class="form-title">Форма входа</h3>
            <input
            type="text"
            class="add-form-login" id="login-input" value=""
            placeholder="Введите логин"
            />
            <input
            type="password"
            class="add-form-password" id="password-input" value=""
            placeholder="Введите пароль" />
            <div class="add-form-row-log">
             <button class="add-form-button" id="login-button">Войти</button>
            </div>
          
          </div>
        </div>`
    const loginInput = document.getElementById('login-input')
    const passwordInput = document.getElementById('password-input')
    const loginButton = document.getElementById('login-button')
    loginButton.addEventListener('click', (event) => {
        event.preventDefault()
        if (!loginInput.value.trim() || !passwordInput.value.trim()) {
            alert('Вы не заполнили поля')
            return
        }
        login({ login: loginInput.value, password: passwordInput.value })
            .then((data) => {
                setUser(data.user)
                renderMainPage({ container })
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
