

export function getCom () {
    return fetch ('https://wedev-api.sky.pro/api/v1/nataly-alpatova/comments',
    {method: "GET",
  })
  .then((response) => {
    return response.json();
  });
};


export function postCom ({name, text}) {
    return fetch ('https://wedev-api.sky.pro/api/v1/nataly-alpatova/comments',
        {method: "POST",
        body:JSON.stringify({
          name: name,
          text: text,
          forceError: true,
        }),        
      }).then((response) => {
        //console.log(response);
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
      })
    }