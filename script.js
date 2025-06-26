// ======= TO-DO LIST SCRIPT =======

// Target DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterInput = document.getElementById("filter-input");

// Load tasks from localStorage on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
};

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  createTask(taskText);
  taskInput.value = "";
  saveTasks();
});

// Filter tasks
filterInput.addEventListener("input", () => {
  const searchTerm = filterInput.value.toLowerCase();
  document.querySelectorAll("#task-list li").forEach(li => {
    const taskText = li.querySelector("span").textContent.toLowerCase();
    li.style.display = taskText.includes(searchTerm) ? "flex" : "none";
  });
});

// Create a new task item
function createTask(text, isCompleted = false) {
  const li = document.createElement("li");

  // Checkbox for completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  // Editable task text
  const span = document.createElement("span");
  span.textContent = text;
  span.contentEditable = "true";
  span.style.flex = "1";
  span.addEventListener("blur", () => saveTasks());
  span.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents new line
      span.blur(); // Triggers blur event to save changes
    }
  });
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  // Assemble list item
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  if (isCompleted) li.classList.add("completed");
  taskList.appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector("span").textContent.trim();
    const completed = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}