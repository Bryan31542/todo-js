// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector("#todo-list")
const saveTaskBtn = document.querySelector(".todo-save-btn")

//Listener que se encargar de agregar los elementos a nuestra lista de Todo
todoBtn.addEventListener("click", () => {
    let addValue = todoInput.value;

    if (addValue.trim() != 0) {
        let webTask = localStorage.getItem("localTask");

        if (webTask == null) {
            taskObject = [];
        }
        else {
            taskObject = JSON.parse(webTask)
        }
        taskObject.push({
            nombre: addValue,
            estado: false
        });
        localStorage.setItem("localTask", JSON.stringify(taskObject));
    }
    renderTask();
});

// Listener que se encarga de mostrar cuando un elemento ha sido completado
todoList.addEventListener("click", (event) => {
    // Sabremos donde estamos haciendo click
    const item = event.target;
    if (item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
})

// Listener que se encarga de actualizar la informacion
saveTaskBtn.addEventListener("click", () => {
    let addTaskbtn = document.querySelector(".todo-btn");
    let webTask = localStorage.getItem("localTask");
    let taskObject = JSON.parse(webTask);
    let saveIndex = document.getElementById("save-index").value;

    // Guardamos el nuevo valor escrito
    taskObject[saveIndex].nombre = todoInput.value;
    saveTaskBtn.style.display = "none";
    addTaskbtn.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskObject));

    // Limpiando el input
    todoInput.value = "";
    // Actualizando la visualizacion de datos
    renderTask();
})

// Funcion que muestra los datos almacenados en el local storage
const renderTask = () => {
    let webTask = localStorage.getItem("localTask");

    if (webTask == null){
        taskObject = [];
    }
    else { 
        taskObject = JSON.parse(webTask)
    }

    let html = ``;
    let todoList = document.getElementById("todo-list");
    taskObject.forEach((element, index) => {
        html +=
            `<div class="todo ${element.estado && "completed"}">
                <li class="todo-item">${index + 1}. ${element.nombre}</li>
                    <button class="complete-btn" onclick="completeTask(${index})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button type="button" class="update-btn" onclick="editTask(${index})">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${index})">
                    <i class="fas fa-trash-alt"></i>
                    </button>
            </div>
            `
    });
    todoList.innerHTML = html;
}

// Muestra los datos que previamente han sido almacenados en la lista, al recargar o entrar a la pagina sin necesidad ingresar datos
renderTask();

// Funcion que se encarga de la edicion de datos
const editTask = (index) => {
    let saveIndex = document.getElementById("save-index");
    let addTaskbtn = document.querySelector(".todo-btn");
    let saveTaskbtn = document.querySelector(".todo-save-btn");

    // Almacenamos el valor del index seleccionado
    saveIndex.value = index;

    let webTask = localStorage.getItem("localTask");
    let taskObject = JSON.parse(webTask);

    // Mandamos al input el contenido que tenemos en el task seleccionado
    todoInput.value = taskObject[index].nombre;

    // Cambiamos visibilidad de botones
    addTaskbtn.style.display = "none";
    saveTaskbtn.style.display = "block"
}

// Funcion que se encarga de intercambiar el estado del elemento
const completeTask = (index) => {
    let saveIndex = document.getElementById("save-index");
    saveIndex.value = index;

    let webTask = localStorage.getItem("localTask");
    let taskObject = JSON.parse(webTask);

    taskObject[index].estado = taskObject[index].estado ? false : true;
    
    localStorage.setItem("localTask", JSON.stringify(taskObject));
}

// Funcion que se encarga de eliminar datos
const deleteTask = (index) => {
    let webTask = localStorage.getItem("localTask");
    let taskObject = JSON.parse(webTask);

    taskObject.splice(index, 1);
    localStorage.setItem("localTask", JSON.stringify(taskObject));
    renderTask();
}