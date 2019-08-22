const postList = $(".post_list");

function paintPostList(posts) {
  console.log(posts.post_list);
  for (let index = 0; index < posts.post_list.length; index++) {
    const title = posts.post_list[`${index}`].title;
    const pre_content = posts.post_list[`${index}`].pre_content;
    const href = posts.post_list[`${index}`].href;
    postList.append(
      `<div class="bubble">
        <div class="bubble-title">
          <a href=${href}><h1>${title}</h1></a>
        </div>
        <div class="divider"></div>
        <div class="bubble-content">
          <p>${pre_content}</p>
        </div>
      </div>`
    );
  }
}

function init() {
  // dosomething
  fetch("./blog/json/post_list.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      paintPostList(json);
    });
}

init();
