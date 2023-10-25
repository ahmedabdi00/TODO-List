document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("new-task-form");
    const taskInput = document.getElementById("new-task-input");
    const taskList = document.getElementById("tasks");

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page

        const taskText = taskInput.value;

        if (taskText.trim() !== "") { // Check if the task text is not empty
            // Create a new task element
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            // Create the content and actions elements for the task
            const taskContent = document.createElement("div");
            taskContent.classList.add("content");
            const taskTextInput = document.createElement("input");
            taskTextInput.setAttribute("type", "text");
            taskTextInput.classList.add("text");
            taskTextInput.value = taskText;
            taskTextInput.readOnly = true;
            taskContent.appendChild(taskTextInput);

            const taskActions = document.createElement("div");
            taskActions.classList.add("actions");
            const editButton = document.createElement("button");
            editButton.classList.add("edit");
            editButton.innerText = "Edit";
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.innerText = "Delete";
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskElement.appendChild(taskContent);
            taskElement.appendChild(taskActions);

            // Add the new task to the task list
            taskList.appendChild(taskElement);

            // Clear the input field
            taskInput.value = "";

            // Add event listeners for Edit and Delete buttons
            editButton.addEventListener("click", function () {
                // Implement your Edit logic here
                taskTextInput.readOnly = !taskTextInput.readOnly;
                editButton.innerText = taskTextInput.readOnly ? "Edit" : "Save";
            });

            deleteButton.addEventListener("click", function () {
                // Implement your Delete logic here
                taskList.removeChild(taskElement);
            });
        }
    });
});
