import { answerComment, likeEvent } from "./listeners.js";
import { comments } from "./main.js";

export const renderComments = () => {
    const listElement = document.getElementById("list"); 
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
  