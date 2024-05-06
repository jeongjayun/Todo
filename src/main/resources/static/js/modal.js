const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelector('.btn-open-modal');
const btnCloseModal = document.querySelector('.btn-close-modal');

btnOpenModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

btnCloseModal.addEventListener("click", function () {
  modal.style.display = "none";
})