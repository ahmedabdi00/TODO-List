$("form").on("submit", (event) => {
    event.preventDefault();
    const $taskText = $("#input-task");
    const $taskCategory = $("#select-category")
    const $taskDate = $("#input-date")
    const $taskPriority = $("#select-priority")
    
    
    
    console.log("TASK", $taskText.val())
    console.log("CAT", $taskCategory.val())
    console.log("DATE", $taskDate.val())
    console.log("PRIORITY", $taskPriority.val())
    $("form")[0].reset();
    });
    
    const $taskIcon = $('.fa-square-check')
    
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
    
    $taskIcon.on('click', (event) => {
      event.target.classList.toggle("clicked")
    })
    