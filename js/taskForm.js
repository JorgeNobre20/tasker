import { USERS } from "./users.js";

const HIDDEN_CSS_CLASS = "hidden";
const VISIBLE_CSS_CLASS = "visible";

function openTaskFormModal(){
  const formModal = document.getElementById("formModal");

  formModal.classList.remove(HIDDEN_CSS_CLASS);
  formModal.classList.add(VISIBLE_CSS_CLASS);
}

export function openCleanTaskFormModal(){
  const formModal = document.getElementById("formModal");

  const {
    modalTitleRef,
    taskCategoryFormFieldRef,
    taskResponsibleFormFieldRef,
    taskStatusFormFieldRef,
    taskTitleFormFieldRef
  } = getTaskFormModalComponents();

  modalTitleRef.innerText = "Cadastrar Tarefa";
  taskCategoryFormFieldRef.value = "";
  taskResponsibleFormFieldRef.value = "";
  taskStatusFormFieldRef.value = "";
  taskTitleFormFieldRef.value = "";
  
  formModal.removeAttribute("data-task-id");

  hideTaskFormDeleteButton();
  openTaskFormModal();
}

export function closeTaskFormModal(){
  const formModal = document.getElementById("formModal");

  formModal.classList.remove(VISIBLE_CSS_CLASS);
  formModal.classList.add(HIDDEN_CSS_CLASS);
}

export function getTaskFormData(){
  const {
    taskCategoryFormFieldRef,
    taskResponsibleFormFieldRef,
    taskStatusFormFieldRef,
    taskTitleFormFieldRef
  } = getTaskFormModalComponents();
  
  return {
    title: taskTitleFormFieldRef.value,
    status: taskStatusFormFieldRef.value,
    category: taskCategoryFormFieldRef.value,
    responsible: taskResponsibleFormFieldRef.value,
  }
}

export function setUserSelectOptions(){
  const taskResponsibleSelectRef = document.getElementById("taskResponsible");

  taskResponsibleSelectRef.innerHTML += makeSelectOptionElement("selecione", "", true);

  USERS.forEach((user) => {
    taskResponsibleSelectRef.innerHTML += makeSelectOptionElement(user.name, user.id, false);
  });
}

export function openFilledTaskFormModal(task){
  const modalRef = document.getElementById("formModal");

  modalRef.setAttribute("data-task-id", task.id);

  const {
    modalTitleRef,
    taskCategoryFormFieldRef,
    taskResponsibleFormFieldRef,
    taskStatusFormFieldRef,
    taskTitleFormFieldRef
  } = getTaskFormModalComponents();

  modalTitleRef.innerText = "Detalhes da Tarefa";

  taskTitleFormFieldRef.value = task.title;
  taskCategoryFormFieldRef.value = task.category;
  taskResponsibleFormFieldRef.value = task.responsibleId;
  taskStatusFormFieldRef.value = task.status;

  openTaskFormModal();
}

export function makeSelectOptionElement(label, value, disabled){
  return `
    <option value="${value}" ${disabled ? "disabled" : ""}>${label}</option>
  `;
}

function getTaskFormModalComponents(){
  const modalTitleRef = document.getElementById("modalTitle");

  const taskTitleFormFieldRef = document.getElementById("taskTitle");
  const taskCategoryFormFieldRef = document.getElementById("taskCategory");
  const taskStatusFormFieldRef = document.getElementById("taskStatus");
  const taskResponsibleFormFieldRef = document.getElementById("taskResponsible");

  return {
    modalTitleRef,
    taskTitleFormFieldRef,
    taskCategoryFormFieldRef,
    taskStatusFormFieldRef,
    taskResponsibleFormFieldRef,
  }
}

export function showTaskFormDeleteButton(){
  const deleteButton = document.getElementById("taskFormDeleteButton");
  deleteButton.classList.remove("hidden");
}

export function hideTaskFormDeleteButton(){
  const deleteButton = document.getElementById("taskFormDeleteButton");
  deleteButton.classList.add("hidden");
}
