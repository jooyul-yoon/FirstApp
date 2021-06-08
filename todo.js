const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo() {
    const btn = event.target;
    const li = btn.parentElement;
    toDoList.removeChild(li);
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDo;
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("ll");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    }

    delBtn.innerText = "❌"
    delBtn.classList.add("todoBtn");
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.append(document.createElement("br"))
    toDoList.appendChild(li);
    li.id = newId;
    li.classList.add("todoLi");

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();