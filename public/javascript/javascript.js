const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", ()=> {
    modal.showModal();
});

closeBtn.addEventListener("click", ()=> {
    modal.close();
});



