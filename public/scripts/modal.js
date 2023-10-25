const $modal = $(".modal");
const $overlay = $(".overlay");
const $openModalBtn = $(".btn-open");
const $closeModalBtn = $(".btn-close");
const $editIcon = $(".fa-pencil")

const openModal = function () {
  $modal.removeClass("hidden");
  $overlay.removeClass("hidden");
};

$("#add-task").on("click", () => {
  // Clear the form inputs
  $("#input-task").val("");
  $("#select-category").val("");
  $("#input-date").val("");
  $("#select-priority").val("");

  openModal();
});

const closeModal = function () {
  $modal.addClass("hidden");
  $overlay.addClass("hidden");
};

$openModalBtn.on("click", () => {
  openModal()
});

$("#list-section").on('click', '.fa-pencil', function (event) {
  openModal()
});

$closeModalBtn.on("click", () => {
  closeModal()
});

$overlay.on("click", () => {
  closeModal()
});