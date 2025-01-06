const todoList = [
    {
        label: "design admin template",
        status: true
    },
    {
        label: "create a new user api",
        status: false
    },
    {
        label: "config security",
        status: false
    }
]

const $ = document.querySelector.bind(document);
let taskList = $('#task-list');

taskList.innerHTML = todoList.map(task => `
        <li class="task-item ${task.status ? "completed" : ""}">
            <span class="task-title">${task.label}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">${task.status ? "Mark as done" : "Mark as undone"}</button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>
    `
).join("");
