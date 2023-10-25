const renderTasks = function (taskObjArray) {
  for (let task of taskObjArray) {
    let layout = createTweetElement(task);
    $("#list-section").prepend(layout);
  }
};

$("form").on("submit", (event) => {
  event.preventDefault();
  const $taskText = $("#input-task").val();
  const $taskCategory = $("#select-category").val()
  const $taskDate = $("#input-date").val()
  const $taskPriority = $("#select-priority").val()

  const $task =
    `<article class="task task-${$taskCategory}">
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
</article>`

$("#list-section").prepend($task)

console.log($taskCategory)

$("form")[0].reset();
});

const $taskIcon = $(".fa-square-check")

$taskIcon.on('click', (event) => {
  event.target.classList.toggle("clicked")
})

$("#nav-all").on("click", (event) => {
  const $task = $(".task");
  $task.removeClass("invisible")
})

$("#nav-watch").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-watch")) {
      $(element).removeClass("invisible")
    } else {
      $(element).addClass("invisible")
    }
  })
})

$("#nav-eat").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-eat")) {
      $(element).removeClass("invisible")
    } else {
      $(element).addClass("invisible")
    }
  })
})

$("#nav-read").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-read")) {
      $(element).removeClass("invisible")
    } else {
      $(element).addClass("invisible")
    }
  })
})

$("#nav-buy").on("click", (event) => {
  const $task = $(".task");
  $task.each((index, element) => {
    if ($(element).hasClass("task-buy")) {
      $(element).removeClass("invisible")
    } else {
      $(element).addClass("invisible")
    }
  })
})