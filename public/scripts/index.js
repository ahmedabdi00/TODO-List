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
  if (taskData["priority_id"] === 1) {
    taskData["priority_id"] = "low-priority";
  } else if (taskData["priority_id"] === 2) {
    taskData["priority_id"] = "med-priority";
  } else if (taskData["priority_id"] === 3) {
    taskData["priority_id"] = "high-priority";
  }

  if (taskData["content"].toLowerCase().includes("watch") || taskData["category_id"] === 1) {
    taskData["category_id"] = "watch";
  } else if (taskData["content"].toLowerCase().includes("eat") || taskData["category_id"] === 2) {
    taskData["category_id"] = "eat";
  } else if (taskData["content"].toLowerCase().includes("read") || taskData["category_id"] === 3) {
    taskData["category_id"] = "read";
  } else if (taskData["content"].toLowerCase().includes("buy") || taskData["category_id"] === 4) {
    taskData["category_id"] = "buy";
  }
  const $task = `<article class="task task-${taskData["category_id"]}" name="${taskData["id"]}">
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

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function (event) {
  event.preventDefault();

  fetch('/logout', {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = '/login';
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
});


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
  const $taskPriority = formDataObj["task-priority"];

  const categoryNum = categoryNumObj[$taskCategory];
  const priorityNum = priorityNumObj[$taskPriority];

  const userFormObj = {
    "content": $taskText,
    "category": categoryNum,
    "priority": priorityNum
  };


  $.ajax({
    url: '/list/todos', method: 'POST', data: { content: userFormObj.content, category: userFormObj.category, priority: userFormObj.priority }
  })
    .then(function () {
      loadTasks();
    })
    .catch((error) => {
      console.log(error);
    })

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
  $.ajax(`/list/todos/${taskId}/delete`, { method: 'POST' });
});

// Toggle task completion when .fa-square-check is clicked
$("#list-section").on('click', '.fa-square-check', function (event) {
  $(event.target).toggleClass("clicked");
  $(this).closest("article").toggleClass("task-completed");
  const checked = $(this).closest("article").hasClass("task-completed");
  console.log(checked);
  const taskId = $(event.target).closest('.task')[0].getAttribute('name');
  console.log(taskId);
  //$(this).closest("article").toggleClass("invisible");
  $.ajax({
    url: '/list/check', method: 'POST', data: { id: taskId, check: checked }
  })
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
    //const $squareCheck = $element.find('.fa-square-check');
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

const loadTasks = function () {

  $.ajax('/list/todos/order', { method: 'GET' })
    .then(function (data) {
      $("#list-section").empty();
      renderTasks(data);
    })
    .catch((error) => {
      console.log(error);
    })
};

loadTasks();