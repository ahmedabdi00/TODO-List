const $modal = $(".modal");
const $overlay = $(".overlay");
const $openModalBtn = $(".btn-open");
const $closeModalBtn = $(".btn-close");
const $editIcon = $(".fa-pencil")

const openModal = function () {
  $modal.removeClass("hidden");
  $overlay.removeClass("hidden");
};

const closeModal = function () {
  $modal.addClass("hidden");
  $overlay.addClass("hidden");
};

$openModalBtn.on("click", () => {
  openModal()
});

$editIcon.on("click", () => {
  openModal()

})

$closeModalBtn.on("click", () => {
  closeModal()
});

$overlay.on("click", () => {
  closeModal()
});