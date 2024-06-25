//основной модуль

import { addComment } from './addComent.js';
import { getCom, postCom } from './api.js';
import { renderComments } from './render.js';


const buttonElement = document.getElementById("add-form-button");
const deleteButton = document.getElementById('delete-button');
const nameInEl = document.getElementById("name-input");   
const textInEl = document.getElementById("text-input");
const commentHTML = document.getElementById ('.comment')



export const getComments = () => {

  getCom().then((responseData) => {
    document.querySelector(".loader").style.display = "none"
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        like: comment.likes,
        isLiked: comment.isLiked
      };
    });

    comments = appComments;
    renderComments();
    // deleteComment();      
  });
};

export let comments = [];

getComments();
addComment();

//deleteComment() 
//renderComments();

console.log("It works!");
