import { display_toast } from "./article.js";

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

let comment = document.getElementById("comment");
let comment_btn = document.getElementById("comment-btn");
let comment_section = document.getElementById("comment-section");

let like_btn = document.getElementById("like-btn");
let like_count = document.getElementById("like-count");

let dislike_btn = document.getElementById("dislike-btn");
let dislike_count = document.getElementById("dislike-count");

let hero = document.getElementById("hero");

if (index !== null) {
    if (images[index] !== "") {
        let img = document.createElement("img");
        img.src = images[index];
        img.classList.add("h-[500px]", "w-[500px]", "m-auto");
        hero.prepend(img);
    }

    article_title.textContent = titles[index];
    article_description.textContent = descriptions[index];
    article_content.textContent = contents[index];
    article_author.textContent = authors[index];
}

let handle_comment = () => {
    if (!comment.value.trim()) {
        display_toast("Comment cannot be empty!", "error", comment_btn, handle_comment);
        return;
    }

    let allComments = JSON.parse(localStorage.getItem("comments")) || [];

    if (!allComments[index]) {
        allComments[index] = [];
    }

    allComments[index].push(comment.value);

    localStorage.setItem("comments", JSON.stringify(allComments));

    comment.value = "";
    display_toast("Comment Published Successfully!", "success", comment_btn, handle_comment);

    render_comments();
};

let render_comments = () => {
    comment_section.innerHTML = "";

    let allComments = JSON.parse(localStorage.getItem("comments")) || [];

    let specificComments = allComments[index] || [];

    specificComments.forEach(text => {
        let p = document.createElement("p");
        let strong = document.createElement("strong");

        p.textContent = `${text}`;
        strong.textContent = `Anonymous: `;
        p.classList.add("bg-gray-100", "p-3", "mb-2", "rounded-md", "border-l-4", "border-blue-500", "w-6/12");
        comment_section.appendChild(p);
        p.prepend(strong);
    });
};

const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const likes = JSON.parse(localStorage.getItem("likes")) || [];
const liked_before = JSON.parse(localStorage.getItem("liked_before")) || [];
const dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];
const disliked_before = JSON.parse(localStorage.getItem("disliked_before")) || [];

const updateReactionUI = () => {
    const likeSvg = like_btn.querySelector("svg");
    const dislikeSvg = dislike_btn.querySelector("svg");

    likeSvg.classList.toggle("fill-sky-600", liked_before[index]);
    likeSvg.classList.toggle("fill-black", !liked_before[index]);

    dislikeSvg.classList.toggle("fill-sky-600", disliked_before[index]);
    dislikeSvg.classList.toggle("fill-black", !disliked_before[index]);

    like_count.textContent = likes[index] || 0;
    dislike_count.textContent = dislikes[index] || 0;
};

const handleReaction = (type) => {
    if (likes[index] === undefined) likes[index] = 0;
    if (dislikes[index] === undefined) dislikes[index] = 0;

    const isLike = type === "like";

    let selfActive = isLike ? liked_before[index] : disliked_before[index];
    let otherActive = isLike ? disliked_before[index] : liked_before[index];

    if (selfActive) {
        isLike ? likes[index]-- : dislikes[index]--;
        isLike ? liked_before[index] = false : disliked_before[index] = false;
    } else {
        isLike ? likes[index]++ : dislikes[index]++;
        isLike ? liked_before[index] = true : disliked_before[index] = true;

        if (otherActive) {
            isLike ? dislikes[index]-- : likes[index]--;
            isLike ? disliked_before[index] = false : liked_before[index] = false;
        }
    }

    saveData("likes", likes);
    saveData("dislikes", dislikes);
    saveData("liked_before", liked_before);
    saveData("disliked_before", disliked_before);

    updateReactionUI();
};

const initIndex = (array, defaultValue) => {
    if (array[index] === undefined || array[index] === null) {
        array[index] = defaultValue;
    }
};

initIndex(likes, 0);
initIndex(dislikes, 0);
initIndex(liked_before, false);
initIndex(disliked_before, false);

const render_likes = () => {
    const likeSvg = like_btn.querySelector("svg");
    const dislikeSvg = dislike_btn.querySelector("svg");

    likeSvg.classList.toggle("fill-sky-600", liked_before[index]);
    likeSvg.classList.toggle("fill-black", !liked_before[index]);

    dislikeSvg.classList.toggle("fill-sky-600", disliked_before[index]);
    dislikeSvg.classList.toggle("fill-black", !disliked_before[index]);

    like_count.textContent = likes[index];
    dislike_count.textContent = dislikes[index];
};

like_btn.addEventListener("click", () => handleReaction("like"));
dislike_btn.addEventListener("click", () => handleReaction("dislike"));

comment_btn.addEventListener("click", handle_comment);

render_comments();
render_likes();