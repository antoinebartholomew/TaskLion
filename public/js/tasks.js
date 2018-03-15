// $(document).ready(function() {
//   // Getting jQuery references to the task body, title, form, and taskr select
//   var bodyInput = $("#body");
//   var titleInput = $("#title");
//   var taskForm = $("#task");
//   var taskrSelect = $("#taskr");
//   // Adding an event listener for when the form is submitted
//   $(taskForm).on("submit", handleFormSubmit);
//   // Gets the part of the url that comes after the "?" (which we have if we're updating a task)
//   var url = window.location.search;
//   var taskId;
//   var taskr;
//   // Sets a flag for whether or not we're updating a task to be false initially
//   var updating = false;

//   // If we have this section in our url, we pull out the task id from the url
//   // In '?task_id=1', taskId is 1
//   if (url.indexOf("?task_id=") !== -1) {
//     taskId = url.split("=")[1];
//     getPostData(taskId, "task");
//   }
//   // Otherwise if we have a tasker in our url, preset the taskr select box to be our Author
//   else if (url.indexOf("?taskr=") !== -1) {
//     taskr = url.split("=")[1];
//   }

//   // Getting the taskrs, and their tasks
//   getTaskrs();

//   // A function for handling what happens when the form to create a new task is submitted
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     // Won't submit the task if we are missing a body, title, or taskr
//     if (!titleInput.val().trim() || !bodyInput.val().trim() || !taskrSelect.val()) {
//       return;
//     }
//     // Constructing a newTask object to hand to the database
//     var newTask = {
//       title: titleInput
//         .val()
//         .trim(),
//       body: bodyInput
//         .val()
//         .trim(),
//       Taskr: taskrSelect.val()
//     };

//     // If we're updating a task run updateTask to update a task
//     // Otherwise run submitTask to create a whole new task
//     if (updating) {
//       newTask.id = taskId;
//       updateTask(newTask);
//     }
//     else {
//       submitTask(newTask);
//     }
//   }

//   // Submits a new task and brings user to tasks page upon completion
//   function submitTask(task) {
//     $.post("/api/tasks", task, function() {
//       window.location.href = "/tasks";
//     });
//   }

//   // Gets task data for the current task if we're editing, or if we're adding to an taskr's existing tasks
//   function getPostData(id, type) {
//     var queryUrl;
//     switch (type) {
//     case "task":
//       queryUrl = "/api/tasks/" + id;
//       break;
//     case "taskr":
//       queryUrl = "/api/taskrs/" + id;
//       break;
//     default:
//       return;
//     }
//     $.get(queryUrl, function(data) {
//       if (data) {
//         console.log(data.Taskr || data.id);
//         // If this task exists, prefill our cms forms with its data
//         titleInput.val(data.title);
//         bodyInput.val(data.body);
//         taskr = data.Taskr || data.id;
//         // If we have a task with this id, set a flag for us to know to update the task
//         // when we hit submit
//         updating = true;
//       }
//     });
//   }

//   // A function to get Taskrs and then render our list of Taskrs
//   function getTaskrs() {
//     $.get("/api/taskrs", renderTaskrList);
//   }
//   // Function to either render a list of taskrs, or if there are none, direct the user to the page
//   // to create an taskr first
//   function renderTaskrList(data) {
//     if (!data.length) {
//       window.location.href = "/taskrs";
//     }
//     // $(".hidden").removeClass("hidden");
//     var rowsToAdd = [];
//     for (var i = 0; i < data.length; i++) {
//       rowsToAdd.push(createTaskrRow(data[i]));
//     }
//     taskrSelect.empty();
//     console.log(rowsToAdd);
//     console.log(taskrSelect);
//     taskrSelect.append(rowsToAdd);
//     taskrSelect.val(taskrId);
//   }

//   // Creates the taskr options in the dropdown
//   function createTaskrRow(taskr) {
//     var listOption = $("<option>");
//     listOption.attr("value", taskr.id);
//     listOption.text(taskr.name);
//     return listOption;
//   }

//   // Update a given task, bring user to the tasks page when done
//   function updateTask(task) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/tasks",
//       data: task
//     })
//       .then(function() {
//         window.location.href = "/tasks";
//       });
//   }
// });
