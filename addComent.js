import { postCom } from "./api.js";
import { sanitize } from "./helpers.js";
import { getComments } from "./main.js";

export function addComment() {
    const buttonElement = document.getElementById("add-form-button")
    const nameInEl = document.getElementById("name-input");    //работае 
    const textInEl = document.getElementById("text-input");
   // loadComment();
    buttonElement.addEventListener("click", () => {

      
    nameInEl.classList.remove("error");  //it works
    textInEl.classList.remove("error");
  
    if (nameInEl.value.trim() === "" && textInEl.value.trim() === "") {
      nameInEl.classList.add("error");
      textInEl.classList.add("error");
      return;
    }
  
    if (nameInEl.value.trim() === "") {
      nameInEl.classList.add("error");          //it works
      return;
         }
    if (textInEl.value.trim() === "") {
      textInEl.classList.add("error");
      return;
    }
        
    postCom({
        name: sanitize(nameInEl.value),
        text: sanitize(textInEl.value)
      
      }).then(() => {
        return getComments();
      
      }).then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameInEl.value = "";
        textInEl.value = "";
      
      })
        .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
      
          if (error.message === "Неверный запрос") {
            alert("Имя и коментарий должны содержать не менее 3-х символов.");
      
          };
          if (error.message === "Сервер не отвечает") {
            alert("Сервер не отвечает, попробуйте позже..");
          }
          //TODO: Отправлять в сиситему сбора ошибок
          console.warn(error);
        });
  })
}

function loadComment() {
    buttonElement.disabled = true;
    buttonElement.textContent = 'Идет загрузка...';
  };