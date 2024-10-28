let inputField = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let todoElems = document.querySelector(".todoBox");

let addDataIntoLocalStorage = () => {
  let todoValue = inputField.value;
  localTodoLists.push(todoValue);
  localStorage.setItem("inputValue", JSON.stringify(localTodoLists));
};

let getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("inputValue"));
};

const updateDataOfLocalStorage = (localTodoLists) => {
  return localStorage.setItem("inputValue", JSON.stringify(localTodoLists));
};

let localTodoLists = getDataFromLocalStorage() || [];

let createTodoItem = (curtElem) => {
  const divElem = document.createElement("div");
  divElem.classList.add("todoItem");
  divElem.innerHTML = `<li class="deleteBtn">${curtElem}</li><i class="fa-solid fa-trash deleteIcon" style="color: #01204e;"></i>`;
  todoElems.append(divElem);
};

let addTask = () => {
  if (inputField.value === "" || inputField.value === null) {
    alert("Please enter a task..");
  } else {
    createTodoItem(inputField.value);
    addDataIntoLocalStorage();
    inputField.value = null;
  }
};

let showTodoList = () => {
  localTodoLists.forEach((curtElem) => {
    createTodoItem(curtElem);
  });
};
showTodoList();

const removeTodoElem = (e) => {
  let todoToRemove = e.target;
  let todoListContent = e.target.previousSibling.innerText;
  let parentElement = todoToRemove.parentElement;
  localTodoLists = localTodoLists.filter((curtTodo) => {
    return curtTodo !== todoListContent;
  });
  updateDataOfLocalStorage(localTodoLists);
  parentElement.remove();
};

todoElems.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteIcon")) removeTodoElem(e);
});

addBtn.addEventListener("click", addTask);
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});
