import { getComments } from "./main.js"
import { renderForm } from "./renderForm.js"

export function renderMainPage({container}) {
container.innerHTML=    `<div class="loader">Подождите, коментарии загружаются...</div>
<ul class="comments" id ="list">    
    </ul> 
            <div class="form"></div>`
getComments().then(() =>{
    renderForm({container:document.querySelector(".form")})
})
}