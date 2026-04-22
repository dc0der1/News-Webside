
let title = localStorage.getItem("title");
let author = localStorage.getItem("author");
let category = localStorage.getItem("category");
let image = localStorage.getItem("image");
let description = localStorage.getItem("description");
let content = localStorage.getItem("article-content");
let main = document.querySelector("main");

function render_article() {
    let section = document.createElement("section");
    section.classList.add("grid", "grid-cols-3", "gap-5", "mb-5");
    main.appendChild(section);

    let h2 = document.createElement("h2");
    h2.textContent = "Posted Articles";
    h2.classList.add("text-[1.5em]", "font-bold", "col-span-3");
    section.appendChild(h2);

    let titles = JSON.parse(localStorage.getItem("title"));
    let authors = JSON.parse(localStorage.getItem("author"));
    let categories = JSON.parse(localStorage.getItem("category"));
    let images = JSON.parse(localStorage.getItem("image"));
    let descriptions = JSON.parse(localStorage.getItem("description"));
    let contents = JSON.parse(localStorage.getItem("content"));

    for (let i = 0; i < titles.length; i++) {

        let article = document.createElement("article");
        article.classList.add("group", "cursor-pointer", "shadow-xl", "p-5");
        section.appendChild(article);

        if (images[i] !== "") {
            let article_image = document.createElement("img");
            article_image.src = images[i];
            article_image.classList.add("editor-card-img");
            article.appendChild(article_image);
        }

        let article_category = document.createElement("p");
        let article_title = document.createElement("p");
        let article_author = document.createElement("p");
        let article_description = document.createElement("p");

        let delete_article_btn = document.createElement("button");
        delete_article_btn.textContent = `Delete Article`;
        delete_article_btn.classList.add("bg-red-500", "text-white", "w-full", "py-1", "mt-5", "hover:bg-red-600", "transition-colors", "duration-200");

        article_title.textContent = titles[i];
        article_author.textContent = authors[i];
        article_category.textContent = categories[i];
        article_description.textContent = descriptions[i];

        article_category.classList.add("editor-card-topic");
        article_title.classList.add("editor-card-title");
        article_description.classList.add("editor-card-description");
        article_author.classList.add("editor-card-author");

        article.appendChild(article_category);
        article.appendChild(article_title);
        article.appendChild(article_description);
        article.appendChild(article_author);
        article.appendChild(delete_article_btn);

        delete_article_btn.addEventListener("click", (e) => {
            e.stopPropagation();

            titles.splice(i, 1);
            authors.splice(i, 1);
            categories.splice(i, 1);
            images.splice(i, 1);
            descriptions.splice(i, 1);
            contents.splice(i, 1);

            localStorage.setItem("title", JSON.stringify(titles));
            localStorage.setItem("author", JSON.stringify(authors));
            localStorage.setItem("content", JSON.stringify(contents));
            localStorage.setItem("category", JSON.stringify(categories));
            localStorage.setItem("description", JSON.stringify(descriptions));
            localStorage.setItem("image", JSON.stringify(images));

            article.remove();

            if (titles.length === 0) {
                section.remove();
            }
        });

        article.addEventListener("click", () => {
           localStorage.setItem("current_article_index", i);
           
           window.location.href = "article-view.html";
        });
    }

    if (titles.length === 0) {
        section.remove();
    }
}

render_article();