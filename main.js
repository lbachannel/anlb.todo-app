const todoList = [
    { label: "design template", status: false },
    { label: "design template 1", status: false }
];

const $ = document.querySelector.bind(document);
const taskList = $('#task-list');
const todoForm = $('#todo-form');
const todoInput = $('#todo-input');

function handleTaskActions(e) {
    const parentElement = e.target.closest('.task-item');
    const index = +parentElement.getAttribute('data-index');
    if (e.target.closest('.edit')) {
        const getValue = prompt('Task label: ', todoList[index].label);
        todoList[index].label = getValue;
        renderTasks();
    } else if (e.target.closest('.done')) {
        todoList[index].status = !todoList[index].status;
        renderTasks();
    } else if (e.target.closest('.delete')) {
        if (confirm(`Are you sure you want to delete this task: ${todoList[index].label}`)) {
            todoList.splice(index, 1);
            renderTasks();
        }
    }
}

function addTask(e) {
    e.preventDefault();
    const value = todoInput.value.trim();

    if (!value) {
        alert("Please write something");
        return;
    }

    todoList.push({
        label: value,
        status: false
    });
    todoInput.value = "";
    renderTasks();
}

const renderTasks = () => {
    taskList.innerHTML = todoList.map((task, index) => `
        <li class="task-item ${task.status ? "completed" : ""}" data-index=${index}>
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

todoForm.addEventListener('submit', addTask);
taskList.addEventListener('click' , handleTaskActions);

renderTasks();