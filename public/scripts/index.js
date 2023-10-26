const $form = $("form");
const $navItems = $(".nav-item");
let taskToEdit = null;
$("#nav-all").addClass("active");

const renderTasks = function (tasksObjArray) {
  for (let task of tasksObjArray) {
    let layout = createTask(task);
    $("#list-section").prepend(layout)
  }
};

const createTask = function (taskData) {
  if (taskData["category_id"] === undefined) {
    if (taskData["content"].includes("1")) {
      taskData["category_id"] = "watch"
    } else if (taskData["content"].includes("2")) {
      taskData["category_id"] = "eat"
    } else if (taskData["content"].includes("3")) {
      taskData["category_id"] = "read"
    } else if (taskData["content"].includes("4")) {
      taskData["category_id"] = "buy"
    }
  }
  const $task = `<article class="task task-${taskData["category_id"]} ${taskData["id"]}" name="${taskData["id"]}">
  <div>
    <h2>${taskData.content}</h2>
  </div>
  <div class="task-icon-container">
    <div class="dot ${taskData["priority_id"]}"></div>
    <div>
      <i class="task-icon fa-solid fa-square-check"></i>
      <i class="task-icon fa-solid fa-pencil"></i>
      <i class="task-icon fa-solid fa-trash"></i>
    </div>
  </div>
</article>`;

  return $task
}

// Update the task when the form is submitted
$("form").on("submit", (event) => {
  const categoryNumObj = {
    "watch": 1,
    "eat": 2,
    "read": 3,
    "buy": 4
  };

  const priorityNumObj = {
    "low-priority": 1,
    "med-priority": 2,
    "high-priority": 3
  }
  event.preventDefault();
  const myFormData = new FormData(event.target)
  const formDataObj = Object.fromEntries(myFormData.entries())

  const $taskText = formDataObj["task-name"];
  const $taskCategory = formDataObj["task-category"];
  const $taskDate = formDataObj["task-date"];
  const $taskPriority = formDataObj["task-priority"];

  const categoryNum = categoryNumObj[$taskCategory];
  const priorityNum = priorityNumObj[$taskPriority]

  const userFormObj = {
    "name": $taskText,
    "category": categoryNum,
    "priority": priorityNum
  }

  console.log(userFormObj)

  $("form")[0].reset();
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
  const taskId = $(event.target).closest('.task')[0].getAttribute('name');
  $.ajax(`/list/todos/${taskId}/delete`, { method: 'POST' })
    .then(function () {
      loadTasks();
    })
    .catch((error) => {
      console.log(error);
    })
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
    const $squareCheck = $element.find('.fa-square-check');
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
  filterTasks("1");
});

// Show eat tasks
$("#nav-eat").on("click", (event) => {
  filterTasks("2");
});

// Show read tasks
$("#nav-read").on("click", (event) => {
  filterTasks("3");
});

// Show buy tasks
$("#nav-buy").on("click", (event) => {
  filterTasks("4");
});

// Show completed tasks
$("#nav-completed").on("click", (event) => {
  filterTasks("completed");
});

const loadTasks = function () {

  $.ajax('/list/todos', { method: 'GET' })
    .then(function (data) {
      $("#list-section").empty();
      renderTasks(data);
    })
    .catch((error) => {
      console.log(error);
    })
};

loadTasks();