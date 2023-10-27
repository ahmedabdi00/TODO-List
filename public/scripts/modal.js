const $modal = $(".modal");
const $overlay = $(".overlay");
const $openModalBtn = $(".btn-open");
const $closeModalBtn = $(".btn-close");
const $editIcon = $(".fa-pencil");

// Function to open the modal
const openModal = function () {
  $modal.removeClass("hidden");
  $overlay.removeClass("hidden");
};

// Event handler to open the modal when the "Add Task" button is clicked
$("#add-task").on("click", () => {
  // Clear the form inputs
  $("#input-task").val("");
  $("#select-category").val("");
  $("#input-date").val("");
  $("#select-priority").val("");

  openModal();
});

// Function to close the modal
const closeModal = function () {
  $modal.addClass("hidden");
  $overlay.addClass("hidden");
};

// Event handlers for opening and closing the modal
$openModalBtn.on("click", () => {
  openModal();
});

$closeModalBtn.on("click", () => {
  closeModal();
});

$overlay.on("click", () => {
  closeModal();
});

$("#list-section").on('click', '.fa-pencil', function (event) {
  openModal();

  // Store the task being edited for later reference
  taskToEdit = $(event.target).closest('.task');

  // Pre-fill the form with the task details
  const taskTitle = taskToEdit.find('h2').text();
  const taskCategory = taskToEdit.hasClass('task-watch') ? 'watch' :
    taskToEdit.hasClass('task-eat') ? 'eat' :
    taskToEdit.hasClass('task-read') ? 'read' : 'buy';
  const taskDate = taskToEdit.find('p').text();
  const taskPriority = taskToEdit.find('.dot').attr('class').replace('dot', '').trim();

  $("#input-task").val(taskTitle);
  $("#select-category").val(taskCategory);
  $("#input-date").val(taskDate);
  $("#select-priority").val(taskPriority);
});
