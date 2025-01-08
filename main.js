const todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];

const $ = document.querySelector.bind(document);
const taskList = $('#task-list');
const todoForm = $('#todo-form');
const todoInput = $('#todo-input');

function setDataIntoLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function escapeHTML(htmlCode) {
    const div = document.createElement('div');
    div.innerText = htmlCode;
    return div.innerHTML;
}

function handleTaskActions(e) {
    const parentElement = e.target.closest('.task-item');
    if (!parentElement) {
        return;
    }
    const index = +parentElement.getAttribute('data-index');
    if (e.target.closest('.edit')) {
        const getValue = prompt('Task label: ', todoList[index].label);

        if (!getValue) {
            return;
        } else if (getValue.trim() === '') {
            alert("Please write something");
            return;
        }
        if (checkTaskExisted(getValue.trim())) {
            if (getValue.trim() === todoList[index].label) {
                return;
            }
            alert("Task already exist!");
            return;
        }
        todoList[index].label = getValue.trim();
        setDataIntoLocalStorage();
        renderTasks();
    } else if (e.target.closest('.done')) {
        todoList[index].status = !todoList[index].status;
        setDataIntoLocalStorage()
        renderTasks();
    } else if (e.target.closest('.delete')) {
        if (confirm(`Are you sure you want to delete this task: ${todoList[index].label}`)) {
            todoList.splice(index, 1);
            setDataIntoLocalStorage();
            renderTasks();
        }
    }
}

const checkTaskExisted = value => {
    for (const key in todoList) {
        if (value === todoList[key].label)
        return true;
    }
    return false;
}

function addTask(e) {
    e.preventDefault();
    const value = todoInput.value.trim();

    if (!value) {
        alert("Please write something");
        return;
    }

    if (todoList.length > 0) {
        if (checkTaskExisted(value)) {
            alert("Task already exist!");
            todoInput.value = "";
            return;
        }
    }

    todoList.push({
        label: value,
        status: false
    });
    setDataIntoLocalStorage();
    todoInput.value = "";
    renderTasks();
}

const renderTasks = () => {
    if (todoList.length > 0) {
        taskList.innerHTML = todoList.map((task, index) => `
            <li class="task-item ${task.status ? "completed" : ""}" data-index=${index}>
                <span class="task-title">${escapeHTML(task.label)}</span>
                <div class="task-action">
                    <button class="task-btn edit">Edit</button>
                    <button class="task-btn done">${task.status ? "Mark as undone" : "Mark as done"}</button>
                    <button class="task-btn delete">Delete</button>
                </div>
            </li>
        `
        ).join("");
    } else {
        taskList.innerHTML = `<li class="empty-message">No task available</li>`;
    }
};

todoForm.addEventListener('submit', addTask);
taskList.addEventListener('click' , handleTaskActions);

renderTasks();