const $form = $("form");
const $navItems = $("#nav-list a");
let taskToEdit = null;

// Edit task when .fa-pencil is clicked
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

// const renderTasks = function(taskObjArray) {
//   for (let task of taskObjArray) {
//     let layout = createTask (task);
//     $("#list-section").prepend(task)
//   }
// }

const createTask = function (taskData) {
  const $task = `<article class="task task-${taskData["task-category"]} invisible">
  <div>
    <h2>${taskData["task-name"]}</h2>
    <p>${taskData["task-date"]}</p>
  </div>
  <div class="task-icon-container">
    <div class="dot ${taskData["task-priority"]}"></div>
    <div>
      <i class="task-icon fa-solid fa-square-check"></i>
      <i class="task-icon fa-solid fa-pencil"></i>
      <i class="task-icon fa-solid fa-trash"></i>
    </div>
  </div>
</article>`;

$("#list-section").prepend($task)
}

// Update the task when the form is submitted
$("form").on("submit", (event) => {
  event.preventDefault();
  const myFormData = new FormData(event.target)
  const formDataObj = Object.fromEntries(myFormData.entries())
  console.log(formDataObj)

  const $taskText = formDataObj["task-name"]
  const $taskCategory = formDataObj["task-category"]
  const $taskDate = formDataObj["task-date"]
  const $taskPriority = formDataObj["task-priority"]

  if (taskToEdit) {
    // Update the existing task with new values
    taskToEdit.find('h2').text($taskText);
    taskToEdit.removeClass().addClass(`task task-${$taskCategory}`);
    taskToEdit.find('p').text($taskDate);
    taskToEdit.find('.dot').attr('class', `dot ${$taskPriority}`);
  } else {
    // Create a new task if taskToEdit is null
    createTask(formDataObj)

    $("form")[0].reset();
    taskToEdit = null; // Reset the taskToEdit variable
  }
});

$navItems.on("click", function (event) {
  // Remove the "active" class from all <a> elements
  $navItems.removeClass("active");
  // Add the "active" class to the clicked <a> element
  $(this).addClass("active");
  // Prevent the default link behavior
  event.preventDefault();
});

// Delete a task when .fa-trash is clicked
$("#list-section").on('click', '.fa-trash', function (event) {
  const taskToDelete = $(event.target).closest('.task');
  taskToDelete.remove();
});

// Toggle task completion when .fa-square-check is clicked
$("#list-section").on('click', '.fa-square-check', function (event) {
  $(event.target).toggleClass("clicked");
  $(this).closest("article").toggleClass("task-completed")
  $(this).closest("article").toggleClass("invisible")
});

// Show all tasks
$("#nav-all").on("click", (event) => {
  const $task = $(".task");
  $task.removeClass("invisible");
});

// Show watch tasks
function filterTasks(category) {
  const $task = $(".task");
  $task.each((index, element) => {
    const $element = $(element);
    if (category === "all" || $element.hasClass(`task-${category}`)) {
      $element.removeClass("invisible");
    } else {
      $element.addClass("invisible");
    }
  });
}

// Show all tasks
$("#nav-all").on("click", (event) => {
  filterTasks("all");
});

// Show watch tasks
$("#nav-watch").on("click", (event) => {
  filterTasks("watch");
});

// Show eat tasks
$("#nav-eat").on("click", (event) => {
  filterTasks("eat");
});

// Show read tasks
$("#nav-read").on("click", (event) => {
  filterTasks("read");
});

// Show buy tasks
$("#nav-buy").on("click", (event) => {
  filterTasks("buy");
});

// Show completed tasks
$("#nav-completed").on("click", (event) => {
  filterTasks("completed");
});