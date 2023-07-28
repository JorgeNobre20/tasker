import { TASK_FLAGS } from "./taskFlags.js";
import { openFilledTaskFormModal, showTaskFormDeleteButton } from "./taskForm.js";
import { USERS } from "./users.js";

let taskId = 0;

let TASKS = [];

export function addTaskToBoard(task){
  taskId += 1;

  const board = getBoardById(task.status);

  const taskList = board.querySelector(".task-list");
  taskList.innerHTML += makeTaskCard(task, taskId);
  
  storeTask(task, taskId);
  addCardOnClickEvent(taskId);
}

function getBoardById(boardId){
  const boards = Array.from(document.getElementsByClassName("board"));

  const board = boards.find((board) => {
    return board.dataset.id === boardId;
  });

  return board;
}

function storeTask(task, createdTaskId){
  TASKS.push({
    id: createdTaskId,
    title: task.title,
    status: task.status,
    responsibleId: task.responsible,
    category: task.category
  });
}

function makeTaskCard(task, createdTaskId){
  const taskFlag = getTaskFlag(task);
  const taskUser = getTaskUser(task);

  const htmlElementId = `taskCard${createdTaskId}`;

  return `
    <li 
      id="${htmlElementId}"
      ondragstart="handleCardDragEvent(event)" 
      class="task-card ${taskFlag.cssClass}" 
      draggable="true"
      data-task-id="${createdTaskId}"
    >
      <div class="task-card-header">
        <h3>${task.title}</h3>
        <span>${taskFlag.label}</span>
      </div>

      <div class="task-card-footer">
        <div class="task-user">
          <img 
            class="user-avatar" 
            src="${taskUser.image}" 
            alt="Avatar de ${taskUser.name}" 
          />
          <span>${taskUser.name}</span>
        </div>
      </div>
    </li>
  `;
}

function getTaskFlag(task){
  return TASK_FLAGS.find((taskFlag) => taskFlag.id === task.category);
}

function getTaskUser(task){
  return USERS.find((user) => user.id === task.responsible);
}

export function allowDropEventInBoards(){
  const boards = Array.from(document.getElementsByClassName("task-list"));

  boards.forEach((board) => {
    board.addEventListener("dragover", handleBoardDragOverEvent);
  });
}

function handleBoardDragOverEvent(event){
  event.preventDefault();
}

export function addDropElementEventListenerInBoards(){
  const boards = Array.from(document.getElementsByClassName("task-list"));

  boards.forEach((board) => {
    board.addEventListener("drop", handleBoardDropCardEvent);
  });
}

function handleBoardDropCardEvent(event){
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text");
  const card = document.getElementById(cardId);
  
  if(card){
    const targetBoard = event.target.parentElement; 
    const newTaskStatus = targetBoard.dataset.id;
    const taskId = Number(card.dataset.taskId);

    event.target.appendChild(card);
  
    updateTaskCardStatus(taskId, newTaskStatus);
  }
}

function addCardOnClickEvent(taskId){
  const card = document.querySelector(`[data-task-id="${taskId}"]`);

  card.addEventListener("click", () => {  
    const task = getTaskById(taskId);
    openFilledTaskFormModal(task);
    showTaskFormDeleteButton();
  });
}

function updateTaskCardStatus(taskId, newStatus){
  const outdateTask = TASKS.find((task) => task.id === taskId);
  const tasksWithoutOutdateTask = TASKS.filter((task) => task.id !== taskId);

  TASKS = [tasksWithoutOutdateTask, { ...outdateTask, status: newStatus }];
}

function getTaskById(taskId){
  return TASKS.find((task) => Number(taskId) === Number(task.id));
}

export function removeTask(taskId){
  TASKS = TASKS.filter((task) => Number(taskId) !== task.id);
}

