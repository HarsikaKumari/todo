// Get the add button
const add = document.getElementById("add");
// Add an onClick event listener
add.addEventListener("click", addTask);

// Create a function to add task to the list
function addTask() {
  // Get the input
  const input = document.getElementById("taskInput");
  // Get the taskList
  const taskList = document.getElementById("taskList");

  // Create the li tag for the task items
  const li = generateLi(input.value);
  // Add the task to the ul
  taskList.appendChild(li);
  // Clear the input value
  input.value = "";
}

// Create a function to generate html
function generateLi(value) {
  // Create li element and add class
  const li = document.createElement("li");
  li.className = "taskItem";

  const checkbox = generateCheckbox();
  const p = generateP(value);
  const dltBtn = generateDltBtn(li);

  // Add all the elements to the li
  li.appendChild(checkbox);
  li.appendChild(p);
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

// Create a function to generate li
function generateDltBtn(li) {
  // Create dlt button and its required attribute
  const dltBtn = document.createElement("button");
  dltBtn.type = "submit";
  dltBtn.className = "dlt";
  dltBtn.innerHTML = "Delete";
  dltBtn.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  return dltBtn;
}