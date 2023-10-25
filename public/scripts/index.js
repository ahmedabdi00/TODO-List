// Store the task being edited
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

// Update the task when the form is submitted
$("form").on("submit", (event) => {
  event.preventDefault();

  const $taskText = $("#input-task").val();
  const $taskCategory = $("#select-category").val();
  const $taskDate = $("#input-date").val();
  const $taskPriority = $("#select-priority").val();

  if (taskToEdit) {
    // Update the existing task with new values
    taskToEdit.find('h2').text($taskText);
    taskToEdit.removeClass().addClass(`task task-${$taskCategory}`);
    taskToEdit.find('p').text($taskDate);
    taskToEdit.find('.dot').attr('class', `dot ${$taskPriority}`);
  } else {
    // Create a new task if taskToEdit is null
    const $task = `<article class="task task-${$taskCategory}">
    <div>
      <h2>${$taskText}</h2>
      <p>${$taskDate}</p>
    </div>
    <div class="task-icon-container">
      <div class="dot ${$taskPriority}"></div>
      <div>
        <i class="task-icon fa-solid fa-square-check"></i>
        <i class="task-icon fa-solid fa-pencil"></i>
        <i class="task-icon fa-solid fa-trash"></i>
      </div>
    </div>
  </article>`;

    $("#list-section").prepend($task);
  }

  $("form")[0].reset();
  taskToEdit = null; // Reset the taskToEdit variable
});

// Delete a task when .fa-trash is clicked
$("#list-section").on('click', '.fa-trash', function (event) {
  const taskToDelete = $(event.target).closest('.task');
  taskToDelete.remove();
});

// Toggle task completion when .fa-square-check is clicked
$("#list-section").on('click', '.fa-square-check', function (event) {
  $(event.target).toggleClass("clicked");
});

// Show all tasks
$("#nav-all").on("click", (event) => {
  const $task = $(".task");
  $task.removeClass("invisible");
});

// Show watch tasks
$("#nav-watch").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-watch")) {
      $(element).removeClass("invisible");
    } else {
      $(element).addClass("invisible");
    }
  });
});

// Show eat tasks
$("#nav-eat").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-eat")) {
      $(element).removeClass("invisible");
    } else {
      $(element).addClass("invisible");
    }
  });
});

// Show read tasks
$("#nav-read").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-read")) {
      $(element).removeClass("invisible");
    } else {
      $(element).addClass("invisible");
    }
  });
});

// Show buy tasks
$("#nav-buy").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-buy")) {
      $(element).removeClass("invisible");
    } else {
      $(element).addClass("invisible");
    }
  });
});
