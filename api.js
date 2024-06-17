export function getCom () {
    return fetch ('https://wedev-api.sky.pro/api/v1/nataly-alpatova/comments',
    {method: "GET",
  })
  .then((response) => {
    return response.json();
  });
};


export function getPost ({name, text}) {
    return fetch ('https://wedev-api.sky.pro/api/v1/nataly-alpatova/comments',
        {method: "POST",
        body:JSON.stringify({
          name:name,
          text:text,
          forceError: true,
        }),        
    });
}