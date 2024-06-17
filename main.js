import { getCom } from './api.js';
import { getPost} from './api.js';

//Основной модуль
const buttonElement = document.getElementById("add-form-button")
      const deleteButton = document.getElementById('delete-button')
      const listElement = document.getElementById("list");      //работает
      const nameInEl = document.getElementById("name-input");    //работае 
      const textInEl = document.getElementById("text-input");  
      const commentHTML = document.getElementById('.comment'); //перенесла в функцию ансвенс 
      
      
      // додумать где вызвать функцию удаления через API!!!
      function deleteComment() {
        deleteButton.addEventListener('click', () => {
          comments.pop();
          renderComments();
        })
      }
      
      
      const getComments = () => {                     
      getCom().then((responseData) => {
        document.querySelector(".loader").style.display="none"
        const appComments = responseData.comments.map((comment) => {
          return{
            name: comment.author.name,
            date: new Date (comment.date),
            text: comment.text,
            like: comment.likes,
            isLiked: comment.isLiked
          };
        });
        
        comments = appComments;   
        renderComments();
        deleteComment();      
      });
    };
    
    // loadComment();
    getComments();
    answerComment();
    
    //TODO: получать из хранлища данных
    
    
    
    
    //создаем [] 
    let comments = [ ];
    
    
    const renderComments = () =>{
      const commentsHtml = comments.
      map((comments, index) => {
        
        return `<li class="comment">
          <div class="comment-header">
            <div>${comments.name}</div>
            <div>${comments.date.toLocaleDateString()}</div>       
          </div>
          <div class="comment-body">
            <div class="comment-text">${comments.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes" data-color= "">
              <span class="likes-counter">${comments.like}</span>
              <button class="like-button ${comments.isLiked ? '-active-like' : ''}
              "data-index= ${index}></button>
            </div>
          </div>  
        </li>`;
        
        
      }).join(" ");
      
      listElement.innerHTML = commentsHtml;
      
      likeEvent();
      answerComment();
      
    };
    
    
    // TODO: удалят из хранилища данных
    renderComments();
    
    // Здесь должна быть функция по удалению  !!!!
    
    
    function likeEvent () {
      //Находит элементы с классом Лайкес в разметке
      const likes = document.querySelectorAll('.like-button');
      //цик фор проходит по каждому элем. в списке
      for (const likeElement of likes) {
        //Добовляет обработчик клика на конкретный элемент в списке
        likeElement.addEventListener("click", (e) => {
          e.stopPropagation();
          
          const index = likeElement.dataset.index;  
          const direction = comments[index].isLiked ? -1: 1;
          comments[index].like += direction
          comments[index].isLiked = !comments[index].isLiked;
          renderComments();
          
        });
      }
    }
    
    //deleteComment() 
    //renderComments();
    
    
    
    function sanitize(text){
      return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      .replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>');
    }
    
    buttonElement.addEventListener("click", () => {
      
      const currentDate = new Date().toLocaleDateString('default',  //it works
      {day: '2-digit', month: '2-digit', year: '2-digit'}) + " "+ 
      new Date().toLocaleTimeString().slice(0,-3);
      
      nameInEl.classList.remove("error");  //it works
      textInEl.classList.remove("error");
      
      if (nameInEl.value.trim ()==="" && textInEl.value.trim ()==="") {       
        nameInEl.classList.add("error");
        textInEl.classList.add("error");  
        return;
      }
      
      if (nameInEl.value.trim ()==="") {       
        nameInEl.classList.add("error");          //it works
        return;
        //alert ("Имя должно содержать хотя бы 3 символа.")
      }
      if (textInEl.value.trim ()===""){
        textInEl.classList.add("error");
        return;          
      }
               
        addComment(); 
      })
      
      const startAt = Date.now();
      console.log("Начинаем выполнять запрос");
      
      function loadComment () {
        buttonElement.disabled = true;
        buttonElement.textContent = 'Идет загрузка...';
      };
      
      function addComment () {
        loadComment();
        return 
      }
      getPost ({
        name:sanitize (nameInEl.value),
        text: sanitize(textInEl.value)
    }).then((response) => {
        console.log(response);
        if (response.status === 400) {            
          throw new Error ("Неверный запрос") 
          
        }
        if (response.status === 500) { 
                  //Код который обрабатывает ошибку
          throw new Error ("Сервер не отвечает");
        } 
        else {
          return response.json();
        }
        
      }).then(() =>{
        return getComments();
        
      }). then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameInEl.value = "";
        textInEl.value = "";
        
      }).catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        
        if(error.message === "Неверный запрос") {
        alert ("Имя и коментарий должны содержать не менее 3-х символов.");
          
        };        
        if(error.message === "Сервер не отвечает"){
         alert ("Сервер не отвечает, попробуйте позже..");
        }
        //TODO: Отправлять в сиситему сбора ошибок
        console.warn(error);
      });
      deleteComment();
      answerComment();
    
    
    
    
    function answerComment() {
      const commentHTML = document.querySelectorAll('.comment');
      commentHTML.forEach((el, i) => {
        el.addEventListener('click', ()=> {
          textInEl.value = `QUOTE_BEGIN>${comments[i].name}\n ${comments[i].text}QUOTE_END`;        //выводи соментарий и имя на которое будем отвечать \n -перенос на другую строку      
        });
      });
    }
    
    //удаление элементов списка:
    // 1. добавить в разметку кнопку "удалить" 
    // 2. добавить на кнопки удаления обработчик клика
    // 3. реализовать внутри обработчика удаления элементов      
    console.log("It works!");
  