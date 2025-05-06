// selections
const btnAdd = document.getElementById("btn-addtask");
const date = document.getElementById("date");
const tasks = document.getElementById("tasks");
const inp = document.getElementById("inp");

const tick = ` <div class='flex gap-2'>
<svg onclick="done(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer hover:text-green-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<svg onclick="del(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer hover:text-red-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
<svg onclick="edit(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</div>`;

// function‍‍
inp.focus();
date.innerText =
  Date().split(" ")[1] +
  "/" +
  Date().split(" ")[2] +
  "/" +
  Date().split(" ")[3] +
  "/" +
  " , " +
  Date().split(" ")[4];
setInterval(function () {
  date.innerText =
    Date().split(" ")[1] +
    "/" +
    Date().split(" ")[2] +
    "/" +
    Date().split(" ")[3] +
    "/" +
    " , " +
    Date().split(" ")[4];
}, 1000);

function savetask() {
  const tasks = document.querySelectorAll("li");
  let savedata = [];
  tasks.forEach((item) => {
    savedata.push({
      text: item.querySelector(".task-text").textContent,
      state: item.querySelector(".task-text").getAttribute("data-state"),
    });
  });
  localStorage.setItem("alltasks", JSON.stringify(savedata));
}
function loadtask() {
  const savedTasks = JSON.parse(localStorage.getItem("alltasks")) || [];
  savedTasks.forEach((item) => {
    const newli = document.createElement("li");
    newli.innerHTML = `<input type='text' class='hidden outline-none border-none w-autoi'/><span data-state="${
      item.state || "notdone"
    }" class="task-text select-none" ${
      item.state === "done"
        ? 'style="text-decoration: line-through; color: gray;"'
        : ""
    }>${item.text}</span>${tick}`;
    tasks.appendChild(newli);
  });
}
loadtask();
function del(e) {
  const item = e.closest("li");
  item.classList.add("fall");
  setTimeout(() => {
    item.remove();
    savetask();
  }, 400);
  inp.focus();
}
function done(e) {
  const taskitem = e.closest("li");
  const taskText = taskitem.querySelector(".task-text");
  if (taskText.getAttribute("data-state") === "notdone") {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "gray";
    taskText.setAttribute("data-state", "done");
  } else {
    taskText.style.textDecoration = "none";
    taskText.style.color = "#ced4da";
    taskText.setAttribute("data-state", "notdone");
  }
  savetask();
  inp.focus();
}
function edit(e) {
  const item = e.closest("li");
  const task = item.querySelector(".task-text");
  const inp = item.querySelector("input");
  if (inp.style.display != "inline") {
    task.style.display = "none";
    inp.style.display = "inline";
    inp.classList.add("animate-pulse");
    item.style.backgroundColor = "#212529";
    e.classList.add("animate-pulse");
    e.style.stroke = "red";
    e.style.fill = "#212529";
    inp.focus();
    inp.value = task.textContent;
  } else {
    if (inp.value == "") {
    } else {
      task.textContent = inp.value;
      e.classList.remove("animate-pulse");
      e.style.stroke = "white";
      e.style.fill = "#343a40";
    }
    task.style.display = "inline";
    inp.style.display = "none";
    item.style.backgroundColor = "#343a40";
  }
}
function addtask() {
  const text = inp.value.trim();
  if (text === "") return;

  const newli = document.createElement("li");
  newli.innerHTML = ` <input type='text' class='hidden outline-none border-none w-auto'/> <span data-state="notdone" class="task-text select-none">${text}</span>${tick}`;
  tasks.appendChild(newli);
  inp.value = "";
  inp.focus();

  // save tasks
  savetask();
  console.log(localStorage);
}
btnAdd.addEventListener("click", addtask);
inp.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addtask();
  }
});
// function demonstrateStorage() {
//     // This doesn't work - each new item overwrites the previous one
//     localStorage.setItem('task1', 'Buy milk');
//     localStorage.setItem('task1', 'Do homework'); // This overwrites 'Buy milk'

//     // This works - we save all tasks as one array
//     const allTasks = ['Buy milk', 'Do homework', 'Call mom'];
//     localStorage.setItem('allTasks', JSON.stringify(allTasks));

//     // To get the tasks back:
//     const savedTasks = JSON.parse(localStorage.getItem('allTasks'));
//     console.log(savedTasks); // ['Buy milk', 'Do homework', 'Call mom']
// }
