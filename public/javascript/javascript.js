const tabOpen = document.querySelector(".tab-open");
const tabClose = document.querySelector(".tab-close");
const commentsContsainer = document.querySelector(".comments-container");

commentsContsainer.style.display = "none";

document.querySelectorAll(".comments-tab").forEach(tab => {
    const open = tab.querySelector(".tab-open");
    const close = tab.querySelector(".tab-closed");

    close.style.display = "none";

    open.addEventListener("click", () => {
        open.style.display = "none";
        close.style.display = "block";
        console.log("opened");
        commentsContsainer.style.display = "block";
    });

    close.addEventListener("click", () => {
        close.style.display = "none";
        open.style.display = "block";
        console.log("closed");
        commentsContsainer.style.display = "none";
    });
});