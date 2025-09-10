function formattedBlogDates(blogs) {
    return blogs.map(blog => {
        const createdAt = new Date(blog.createdAt);
        const now = new Date();
        const diffMs = now - createdAt;
        const diffHrs = diffMs / (1000 * 60 * 60);
        let formattedDate;
        if (diffHrs > 24) {
            formattedDate = createdAt.toLocaleString("en-us", {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
            });
        } else {
            formattedDate = `${Math.floor(diffHrs)}h`;
        }
        return {...blog, formattedDate };
    })
}

function commentToggles() {
    document.querySelectorAll(".blog").forEach(blog => {
        const open = blog.querySelector(".tab-open");
        const close = blog.querySelector(".tab-closed");
        const commentsTab = blog.querySelector(".comments-tab");
        const commentsContsainer = blog.querySelector(".comments-container");

        close.style.display = "none";
        commentsContsainer.style.display = "none";
        open.style.display = "inline";

        let isOpen = false;

        commentsTab.addEventListener("click", () => {
            isOpen = !isOpen;
            commentsContsainer.style.display = isOpen ? "block" : "none";
            open.style.display = isOpen ? "none" : "inline";
            close.style.display = isOpen ? "inline" : "none";
        })
    });
}

function renderBlogs(blogs) {

    const blogList = document.querySelector(".blogs-list");
    blogList.innerHTML = "";

    if (blogs.length < 1) {
        blogList.innerHTML = "<li>No blogs found</li>";
        return;
    }

    blogs.forEach(blog => {
        const li = document.createElement("li");
        li.classList.add("blog")

        li.innerHTML = `
                <li class="blog">
                    <div class="blog-content">
                        <div class="info">
                            <strong>${blog.title}</strong>
                            <span>
                                <small> ${blog.formattedDate}</small>
                                <form action="http://localhost:3000/blog/${blog.id}?_method=DELETE" method="POST">
                                    <button type="submit" class="delete-btn">Delete</button>
                                </form>
                            </span>
                        </div>
                        <div class="text">${blog.content}</div>
                    </div>
                    <div class="comments">
                        <div class="comments-tab">
                            <svg xmlns="http://www.w3.org/2000/svg" class="tab-closed" viewBox="0 0 24 24">
                                <title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="tab-open" viewBox="0 0 24 24">
                                <title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </div>
                        <div class="comments-container">
                            ${blog.comments && blog.comments.length > 0
                                ? blog.comments.map(comment => `<div class="comment">${comment.user.username}: <em>${comment.text}</em></div>`).join("")
                                : ""
                            }
                        </div>
                    </div>
                </li>`
        blogList.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", async () => {
    const authCheck = await fetch("http://localhost:3000/user/check", {
        method: "GET",
        credentials: 'include',
    })
    .then(res => res.json());

    if (!authCheck.loggedIn) {
        window.location.href = "http://localhost:3001/login";
        return;
    }

    const blogs = await fetch("http://localhost:3000/blog", {
        method: "GET",
        credentials: 'include',
    })
    .then(res => res.json())
    .catch(err => console.error("Error fetching blogs: ", err));

    const body = document.querySelector("body");
    body.classList.remove("hidden");

    const formattedBlogs = formattedBlogDates(blogs);
    renderBlogs(formattedBlogs);
    commentToggles();

    console.log("AuthCheck: ", authCheck);
    
    const userIdInput = document.querySelector("#userId");
    if (userIdInput) {
        userIdInput.value = authCheck.user.id;
    };
})