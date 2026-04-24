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
        p.textContent = `Anonymous ${text}`;
        p.classList.add("bg-gray-100", "p-3", "mb-2", "rounded-md", "border-l-4", "border-blue-500", "w-6/12");
        comment_section.appendChild(p);
    });
};

let liked_before = false; // Boolean

let like_btns = () => {
    let likes = JSON.parse(localStorage.getItem("likes")) || [];
    let liked = JSON.parse(localStorage.getItem("liked_before")) || [];

    let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];
    let disliked_before = JSON.parse(localStorage.getItem("disliked_before")) || [];

    if (liked[index] === false && disliked_before[index] === false) {
        likes[index]++;
        liked[index] = true;
        
        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("liked_before", JSON.stringify(liked));

        like_btn.querySelector("svg").classList.remove("fill-black");
        like_btn.querySelector("svg").classList.add("fill-sky-600");

        like_count.textContent = `${likes[index]}`;

        return;
    }

    if (liked[index] === true) {
        likes[index]--;
        liked[index] = false;
        
        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("liked_before", JSON.stringify(liked));

        like_btn.querySelector("svg").classList.remove("fill-sky-600");
        like_btn.querySelector("svg").classList.add("fill-black");

        like_count.textContent = `${likes[index]}`;

        return;
    }

    if (liked[index] === false && disliked_before[index] === true) {
        likes[index]++;
        dislikes[index]--;

        disliked_before[index] = false;
        liked[index] = true;

        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("liked_before", JSON.stringify(liked));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        localStorage.setItem("disliked_before", JSON.stringify(disliked_before));

        dislike_btn.querySelector("svg").classList.remove("fill-sky-600");
        dislike_btn.querySelector("svg").classList.add("fill-black");

        like_btn.querySelector("svg").classList.remove("fill-black");
        like_btn.querySelector("svg").classList.add("fill-sky-600");

        like_count.textContent = `${likes[index]}`;
        dislike_count.textContent = `${dislikes[index]}`;

        return;
    }
};

let dislike_btns = () => {
    let likes = JSON.parse(localStorage.getItem("likes")) || [];
    let liked = JSON.parse(localStorage.getItem("liked_before")) || [];

    let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];
    let disliked_before = JSON.parse(localStorage.getItem("disliked_before")) || [];

    if (disliked_before[index] === false && liked[index] === false) {
        dislikes[index]++;
        disliked_before[index] = true;
        
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        localStorage.setItem("disliked_before", JSON.stringify(disliked_before));

        dislike_btn.querySelector("svg").classList.remove("fill-black");
        dislike_btn.querySelector("svg").classList.add("fill-sky-600");

        dislike_count.textContent = `${dislikes[index]}`;

        return;
    }

    if (disliked_before[index] === true) {
        dislikes[index]--;
        disliked_before[index] = false;
        
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        localStorage.setItem("disliked_before", JSON.stringify(disliked_before));

        dislike_btn.querySelector("svg").classList.remove("fill-sky-600");
        dislike_btn.querySelector("svg").classList.add("fill-black");

        dislike_count.textContent = `${dislikes[index]}`;

        return;
    }

    if (liked[index] === true && disliked_before[index] === false) {
        likes[index]--;
        dislikes[index]++;

        disliked_before[index] = true;
        liked[index] = false;

        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("liked_before", JSON.stringify(liked));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        localStorage.setItem("disliked_before", JSON.stringify(disliked_before));

        dislike_btn.querySelector("svg").classList.remove("fill-black");
        dislike_btn.querySelector("svg").classList.add("fill-sky-600");

        like_btn.querySelector("svg").classList.remove("fill-sky-600");
        like_btn.querySelector("svg").classList.add("fill-black");

        like_count.textContent = `${likes[index]}`;
        dislike_count.textContent = `${dislikes[index]}`;

        return;
    }
}

let render_likes = () => {
    let likes = JSON.parse(localStorage.getItem("likes")) || [];
    let liked = JSON.parse(localStorage.getItem("liked_before")) || [];

    let dislikes = JSON.parse(localStorage.getItem("dislikes")) || [];
    let disliked = JSON.parse(localStorage.getItem("disliked_before")) || [];

    if (likes[index] === undefined || likes[index] === null ||
        dislikes[index] === undefined || dislikes[index] === null
    ) {
        likes[index] = 0;
        dislikes[index] = 0;

        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
    }

    if (liked[index] === undefined || liked[index] === null ||
        disliked[index] === undefined || disliked[index] === null
    ) {
        liked[index] = false;
        disliked[index] = false;

        localStorage.setItem("liked_before", JSON.stringify(liked));
        localStorage.setItem("disliked_before", JSON.stringify(disliked));
    }

    if (liked[index] === false) {
        like_btn.querySelector("svg").classList.remove("fill-sky-600");
        like_btn.querySelector("svg").classList.add("fill-black");
    } else {
        like_btn.querySelector("svg").classList.remove("fill-black");
        like_btn.querySelector("svg").classList.add("fill-sky-600");
    }

    if (disliked[index] === false) {
        dislike_btn.querySelector("svg").classList.remove("fill-sky-600");
        dislike_btn.querySelector("svg").classList.add("fill-black");
    } else {
        dislike_btn.querySelector("svg").classList.remove("fill-black");
        dislike_btn.querySelector("svg").classList.add("fill-sky-600");
    }

    like_count.textContent = `${likes[index]}`;
    dislike_count.textContent = `${dislikes[index]}`;
};

like_btn.addEventListener("click", like_btns);
dislike_btn.addEventListener("click", dislike_btns);

comment_btn.addEventListener("click", handle_comment);

render_comments();
render_likes();