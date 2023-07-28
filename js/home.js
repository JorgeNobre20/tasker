import { 
  openCleanTaskFormModal, 
  closeTaskFormModal, 
  getTaskFormData, 
  setUserSelectOptions, 
  hideTaskFormDeleteButton 
} from "./taskForm.js";

import { 
  addTaskToBoard, 
  allowDropEventInBoards, 
  addDropElementEventListenerInBoards, 
  removeTask 
} from "./boards.js";

window.onload = () => {
  addOpenTaskModalToRegister();
  addCloseModalEventListener();

  setUserSelectOptions();
  
  addTaskFormSubmitEventListener();

  allowDropEventInBoards();
  addDropElementEventListenerInBoards();
  
  addDeleteTaskFormButtonClickListener();
}

function addOpenTaskModalToRegister(){
  const openModalTaskButtonRef = document.getElementById("openTaskModalBtn");

  openModalTaskButtonRef.addEventListener("click", () => {
    openCleanTaskFormModal();
  });
}

function addCloseModalEventListener(){
  const openModalTaskButtonRef = document.getElementById("closeTaskModalBtn");

  openModalTaskButtonRef.addEventListener("click", () => {
    closeTaskFormModal();
    hideTaskFormDeleteButton();
  });
}

function addTaskFormSubmitEventListener(){
  const taskFormRef = document.getElementById("taskForm");

  taskFormRef.addEventListener("submit", handleTaskFormSubmit);
}

function handleTaskFormSubmit(event){
  event.preventDefault();

  const modalRef = document.getElementById("formModal");
  const selectedTaskId = modalRef.getAttribute("data-task-id");

  if(selectedTaskId){
    const card = document.querySelector(`[data-task-id="${selectedTaskId}"]`);
    card.parentElement.removeChild(card);

    removeTask(selectedTaskId);
  }

  const task = getTaskFormData();
  addTaskToBoard(task);

  closeTaskFormModal(); 
}

function addDeleteTaskFormButtonClickListener(){
  const deleteButtonRef = document.getElementById("taskFormDeleteButton");

  deleteButtonRef.addEventListener("click", () => {
    const modalRef = document.getElementById("formModal");
    const selectedTaskId = modalRef.getAttribute("data-task-id");

    const taskCard = document.querySelector(`[data-task-id="${selectedTaskId}"]`);
    taskCard.parentElement.removeChild(taskCard);
    removeTask(selectedTaskId);

    closeTaskFormModal();
  });
}