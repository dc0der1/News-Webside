

let title = document.getElementById("title");
let author = document.getElementById("author");
let category = document.getElementById("category");
let image = document.getElementById("image");
let description = document.getElementById("description");
let content = document.getElementById("article-content");
let submit = document.getElementById("submit");

let main = document.querySelector("main");

let character_count = document.getElementById("characters-counter");
let word_count = document.getElementById("word-counter");

let handleSubmit = () => {
    if (title.value === null || title.value === "") {
        display_toast("Title cannot be empty!", "error");
        return;
    }

    if (author.value === null || author.value === "") {
        display_toast("Author cannot be empty!", "error");
        return;
    }

    if (description.value === null || description.value === "") {
        display_toast("Description cannot be empty!", "error");
        return;
    }

    if (content.value === null || content.value === "") {
        display_toast("Content cannot be empty!", "error");
        return;
    }

    save_article_info("title", title.value);
    save_article_info("author", author.value);
    save_article_info("category", category.value);
    save_article_info("image", image.value);
    save_article_info("description", description.value);
    save_article_info("content", content.value);

    display_toast("Published Successfully", "success");
    return;
};

function save_article_info(article_info, article_variable_value) {
    let titles = JSON.parse(localStorage.getItem(article_info)) || [];
    titles.push(article_variable_value);
    localStorage.setItem(article_info, JSON.stringify(titles));
}

submit.addEventListener("click", handleSubmit);

function display_toast(msg, type) {
    submit.removeEventListener("click", handleSubmit);

    let div = document.createElement("div");
    div.classList.add("show-tiast-animation", "mr-5", "w-[13%]", "self-end", "text-white", "py-5", "rounded-[10px]", "show-toast-animation", "overflow-hidden", "absolute");

    let toast_msg = document.createElement("p");

    if (type === "error") {
        div.classList.add("bg-[red]");

        toast_msg.innerHTML = `
        <span class="flex items-center gap-2.5 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span>${msg}</span>
        </span>
        
        <span class="mr-5">
            <button id="delete-toast-btn" class="opacity-75">X</button>
        </span>`;
    } else {
        div.classList.add("bg-green-500");

        toast_msg.innerHTML = `
        <span class="flex items-center gap-2.5 ml-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <span>${msg}</span>
        </span>
        
        <span class="mr-5">
            <button id="delete-toast-btn" class="opacity-75">X</button>
        </span>`;
    }

    toast_msg.classList.add("flex", "gap-2.5", "justify-between", "w-full");
    div.appendChild(toast_msg);

    let border_bottom_animation = document.createElement("div");
    border_bottom_animation.classList.add("absolute", "bottom-0", "left-0", "h-1", "bg-white", "animate-toast-progress");
    div.appendChild(border_bottom_animation);

    main.appendChild(div);

    document.getElementById("delete-toast-btn").addEventListener("click", () => {
        div.remove();
        submit.addEventListener("click", handleSubmit);
    })

    if (div !== null) {
        setTimeout(() => {
            console.log("REMOVED");
            div.remove();
            submit.addEventListener("click", handleSubmit);
        }, 5000);
    }
}

let letter_counter = () => {
    character_count.textContent = `${description.value.length} Characters`;

    if (description.value.length >= 300) {
        description.classList.add("outline-[red]");
        character_count.classList.add("text-[red]");
        character_count.textContent = `Max Characters Reached!`;
    } else {
        character_count.classList.remove("text-[red]");
        description.classList.remove("outline-[red]");
    }
}

let count = 0;
const WORD_LIMIT = 500;

word_count.textContent = `${count} / ${WORD_LIMIT} Words`;

content.addEventListener("keydown", (e) => {
    let text = content.value.trim();
    let words = text.split(/\s+/);
    let count = text === "" ? 0 : words.length;

    const keysToAllow = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (keysToAllow.includes(e.key)) {
        return;
    }

    if (count >= WORD_LIMIT) {
        updateCounter(words.length);
        e.preventDefault();
    }

    updateCounter(words.length);
})

function updateCounter(currentCount) {
    word_count.textContent = `${currentCount} / ${WORD_LIMIT} Words`;

    if (currentCount >= WORD_LIMIT) {
        word_count.classList.add("text-red-500");
        content.classList.add("outline-red-500");
    } else {
        word_count.classList.remove("text-red-500");
        content.classList.remove("outline-red-500");
    }
}

content.addEventListener("input", () => {
    let text = content.value.trim();
    let words = text.match(/\S+/g) || [];

    if (words.length > WORD_LIMIT) {
        let trimmedText = words.slice(0, WORD_LIMIT).join(" ");
        content.value = trimmedText;
        
        word_count.textContent = "Max Words Reached! (Extra words removed)";
        word_count.classList.add("text-red-500");
    }

    updateCounter(words.length);
});

description.addEventListener("input", letter_counter);