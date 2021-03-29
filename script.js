const taskInput = document.querySelector(".new-task__name");
const addButton = document.querySelector(".btn-add");
const incompleteTaskHolder = document.querySelector(".task-list_incomplete");
const completedTasksHolder = document.querySelector(".task-list_complete");


const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");

  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.className = "task-list__item";

  label.innerText = taskString;
  label.className = "task-list__item__name task-list__item__name_label";

  checkBox.type = "checkbox";
  checkBox.className = "task-list__item__checkbox";
  editInput.type = "text";
  editInput.className = "task-list__item__name task-list__item__name_input";

  editButton.innerText = "Edit";
  editButton.className = "btn btn-edit";

  deleteButton.className = "btn btn-delete";
  deleteButtonImg.className = "btn-delete__img";
  deleteButtonImg.src = './assets/images/remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};


const addTask = () => {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};


function editTask() {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".btn-edit");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};


function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};


function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};


const ajaxRequest = () => console.log("AJAX Request");


addButton.addEventListener("click", () => {
  addTask();
  ajaxRequest();
});


const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector(".task-list__item__checkbox");
  const editButton = taskListItem.querySelector(".btn-edit");
  const deleteButton = taskListItem.querySelector(".btn-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};


for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};
