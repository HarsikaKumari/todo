// Get the taskList
const taskList = document.getElementById("taskList");
// Get the add button
const add = document.getElementById("add");
// Add an onClick event listener
add.addEventListener("click", addTask);

// Create an array to store tasks
let taskArray = [];
// Call the function to show all the tasks
showTask();

// Create a function to show already added tasks
function showTask() {
  // Get all the tasks from local storage
  const allTasks = JSON.parse(localStorage.getItem("com.tma.tasks")).tasks;

  // Map the tasks and add it to taskList
  allTasks.map(function (task) {
    const li = generateLi(task.title, task.id);
    taskList.appendChild(li);
    taskArray.push(task);
  });
}

// Create a function to add task to the list
function addTask() {
  // Get the input
  const input = document.getElementById("taskInput");

  // Create current time for id
  const id = new Date().getTime();
  // Create the li tag for the task items
  const li = generateLi(input.value, id);
  // Add the task to the ul
  taskList.appendChild(li);

  // Create an task object
  const task = {
    id: id,
    title: input.value,
  };

  // Add item to the taskArray
  taskArray.push(task);
  // Clear the input value
  input.value = "";

  // Save the task to local storage
  localStorage.setItem("com.tma.tasks", JSON.stringify({ tasks: taskArray }));
}

// Create a function to generate html
function generateLi(value, id) {
  // Create li element and add class
  const li = document.createElement("li");
  li.className = "taskItem";
  li.id = id;

  // Create checkbox, p and dlt button
  const checkbox = generateCheckbox();
  const p = generateP(value);
  const dltBtn = generateDltBtn();

  // Create a div and add checkbox and p in it
  const div = generateDiv(checkbox, p);

  // Add all the elements to the li
  li.appendChild(div);
  li.appendChild(dltBtn);

  // Return li
  return li;
}

// Create a function to generate checkbox input
function generateCheckbox() {
  // Create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "check";

  // Add event listener to the checkbox to add or remove strikes
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      this.parentElement.querySelector("p").classList.add("strike");
    } else {
      this.parentElement.querySelector("p").classList.remove("strike");
    }
  });

  return checkbox;
}

// Create a function to generate p tag
function generateP(value) {
  // Create a p tag to store the value of task
  const p = document.createElement("p");
  p.className = "task";
  p.innerHTML = value;

  return p;
}

// Create a function to generate div tag
function generateDiv(checkbox, p) {
  // Create a div and add checkbox and p in it
  const div = document.createElement("div");
  div.className = "itemDetail";
  div.appendChild(checkbox);
  div.appendChild(p);

  return div;
}

// Create a function to generate li
function generateDltBtn() {
  // Create delete button and its required attribute
  const dltBtn = document.createElement("button");
  dltBtn.type = "submit";
  dltBtn.className = "dlt";
  dltBtn.innerHTML = "Delete";

  // Add an event listener to delete task on click
  dltBtn.addEventListener("click", dltTask);

  return dltBtn;
}

// Create a function to delete task
function dltTask(event) {
  // Get the li
  const li = event.target.parentElement;
  // Remove the li from the taskList
  taskList.removeChild(li);

  // Remove the task from the array
  taskArray = taskArray.filter(function (item) {
    return item.id != li.id;
  });

  // Update the array in local storage
  localStorage.setItem("com.tma.tasks", JSON.stringify({ tasks: taskArray }));
}
