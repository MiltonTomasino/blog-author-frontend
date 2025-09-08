const tabOpen = document.querySelector(".tab-open");
const tabClose = document.querySelector(".tab-close");
const commentsContsainer = document.querySelector(".comments-container");
const commentsTab = document.querySelector(".comments-tab");

commentsContsainer.style.display = "none";

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


const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", ()=> {
    modal.showModal();
});

closeBtn.addEventListener("click", ()=> {
    modal.close();
});



