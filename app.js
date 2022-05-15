const pageHeader = document.querySelector('h1');
const todolist = document.querySelector('.todolist');

const defaultProjects = document.querySelector('.default-projects');
const newProjects = document.querySelector('.new-projects');


const defaultButtons = defaultProjects.querySelectorAll('button');
const addTaskBtn = document.querySelector('.new-task-btn');
const addProjectBtn = document.querySelector('.new-project-btn');

const projectArray = [];

function getIndex(name) {
  for(i = 0; i < projectArray.length; i++)
    if(projectArray[i].header == name)
      return i;
}

const Project = (name) => {
  let header = name;
  let list = [];
  let completed = [];

  const display = (pos) => {
    todolist.innerText = ""; // Reset the list

    pageHeader.innerText = header; // print the header
    for(i = 0; i < list.length; i++) { // print the list
      const todoBox = document.createElement('div');
      todoBox.classList.add('todo');

      const text = `
        <input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
        ${projectArray[pos].list[i]}
      `
      todoBox.innerHTML = text;

      todolist.appendChild(todoBox);
    }
  }

  return {header, list, display};
}

// Initializations
projectArray[0] = Project('Inbox');
projectArray[1] = Project('Today');
projectArray[2] = Project('This Week');
projectArray[3] = Project('Project 1');

// Display page event listener
defaultButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const pos = getIndex(btn.innerText);
    projectArray[pos].display(pos);
  })
});

addTaskBtn.addEventListener("click", () => {
  let currentPage = pageHeader.innerText;
  const getInfo = prompt('New Task');

  projectArray[getIndex(currentPage)].list.push(getInfo);
  projectArray[getIndex(currentPage)].display(getIndex(currentPage));
});

addProjectBtn.addEventListener("click", () => {
  const getInfo = prompt('New Project');

  const new_project = Project(getInfo);
  projectArray.push(new_project);

  const new_button = document.createElement('button');
  new_button.innerText = getInfo;
  new_button.addEventListener("click", () => {
    projectArray[projectArray.length - 1].display(projectArray.length - 1);
  });

  const projectButtons = newProjects.querySelectorAll('button');
  newProjects.appendChild(new_button);
  console.log(projectButtons);

  projectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      projectArray[getIndex(btn.innerText)].display(getIndex(btn.innerText));
    });
  });
});
