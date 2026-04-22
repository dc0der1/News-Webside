
let index = localStorage.getItem("current_article_index");

let titles = JSON.parse(localStorage.getItem("title"));
let authors = JSON.parse(localStorage.getItem("author"));
let descriptions = JSON.parse(localStorage.getItem("description"));
let images = JSON.parse(localStorage.getItem("image"));
let contents = JSON.parse(localStorage.getItem("content"));
let categories = JSON.parse(localStorage.getItem("category"));

let article_title = document.getElementById("article-title");
let article_description = document.getElementById("article-description");
let article_content = document.getElementById("article-content");
let article_author = document.getElementById("article-author");

let main = document.querySelector("main");

if (index !== null) {
    if (images[index] !== "") {
        let img = document.createElement("img");
        img.src = images[index];
        img.classList.add("h-auto");
        main.prepend(img);
    }

    article_title.textContent = titles[index];
    article_description.textContent = descriptions[index];
    article_content.textContent = contents[index];
    article_author.textContent = authors[index];
}