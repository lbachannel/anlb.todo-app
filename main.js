const todoList = [
    { label: "design template", status: false }
];

const $ = document.querySelector.bind(document);
const taskList = $('#task-list');
const todoForm = $('#todo-form');
const todoInput = $('#todo-input');

todoForm.onsubmit = function(e) {
    e.preventDefault();
    const value = todoInput.value.trim();

    if (!value) {
        alert("Please write something");
        return;
    }

    const createTask = {
        label: value,
        status: false
    }

    todoList.push(createTask);
    todoInput.value = "";
    render();
}

const render = () => {
    taskList.innerHTML = todoList.map(task => `
        <li class="task-item ${task.status ? "completed" : ""}">
            <span class="task-title">${task.label}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">${task.status ? "Mark as undone" : "Mark as done"}</button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
    `
    ).join("");
};

render();