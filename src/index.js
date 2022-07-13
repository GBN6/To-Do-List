//     DOM
const UI = (() => {
    setActiveProject();
    const createNewProjectButton = document.querySelector('.btn-project-user');

    createNewProjectButton.addEventListener('click', displayProjectInput);

    function displayProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');
        const addNewProject = document.querySelector('.btn-add-project-popup');

        addNewProject.addEventListener('click', addProject)
        newProjectPopup.classList.add('active');
        createNewProjectButton.classList.add('active');
    }

    function closeProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');
        const closeProject = document.querySelector('.btn-close-poject-popup');

        createNewProjectButton.classList.remove('active');
        newProjectPopup.classList.remove('active');

        closeProject.addEventListener('click', () => {
            createNewProjectButton.classList.remove('active');
            newProjectPopup.classList.remove('active')
        })
    }

    function addProject() {
        const newProjectInput = document.querySelector('.input-add-project-popup');
        const inputError = document.querySelector('.title-error')
        let projectName = newProjectInput.value.trim();
        if (projectName === '') {
            inputError.textContent = 'Project must have name'
            return;
        }
        if (projectList.contains(projectName)) {
            inputError.textContent = 'Project must have different names'
            return;
        }
        projectList.addProject(projectName);
        inputError.textContent = '';
        clearUserProjects()
        renderProjectList();
        newProjectInput.value = '';
        closeProjectInput();
    }

    function renderProjectList() {
        projectList.forEach(project => {
                if (
                    project.title !== 'Your Tasks' &&
                    project.title !== 'Today' && 
                    project.title !== 'This week' 
                ) {
                    renderProjectsNav(project.title);
                }
            })
    }

    function deleteProject() {
        const deleteProjectButton = document.querySelectorAll('.btn-project-delete');
        deleteProjectButton.forEach((element) => element.addEventListener('click', (e) => {
            let projectName = e.target.parentNode.parentNode.textContent;
            for (let i = 0; i < projectList.length; i++)
            {
                if (projectName === projectList[i].title)
                {
                    projectList.deleteProject(i);
                    console.log(projectList);
                    clearUserProjects();
                    renderProjectList();
                    clearTaskContainer()      
                }         
            }
        }))
    }

    function setActiveProject() {
        const activeProject = document.querySelectorAll('.btn-choose-project')
        activeProject.forEach((element) => element.addEventListener('click', handleProjects)
    )}

    function handleProjects(e) {
        hideAddTaskForm();
        const projectTitle = this.textContent.trim();
        if (e.target.classList.contains('fa-times'))
        {
            deleteProject();
            return; 
        }
        openProject(projectTitle, this);
    }

    function openProject(projectTitle, projectButton) {
        const projectButtons = document.querySelectorAll('.btn-choose-project');
        projectButtons.forEach((button) => button.classList.remove('active'));
        projectButton.classList.add('active');
        renderActiveProject(projectTitle);
    }

    function renderActiveProject(projectTitle) {
        const tasksContainer = document.querySelector('.task-projects-preview');
        const projectName = document.createElement('h1');
        const tasksList = document.createElement('div');
        const addTaskButton = document.createElement('button')
        const addTaskButtonIcon = document.createElement('i');
        const addTaskText = document.createElement('span');

        clearTaskContainer()

        tasksList.classList.add('task-list');
        addTaskButton.classList.add('btn-add-task');
        addTaskButtonIcon.classList.add('fas', 'fa-plus');
        addTaskText.textContent = 'Add Task';

        addTaskButton.appendChild(addTaskButtonIcon);
        addTaskButton.appendChild(addTaskText);

        projectName.textContent = `${projectTitle}`;

        if (projectTitle === 'Today' || projectTitle === 'This week')
        {
            tasksContainer.appendChild(projectName);
            tasksContainer.appendChild(tasksList);
        }
        else 
        {
            tasksContainer.appendChild(projectName);
            tasksContainer.appendChild(tasksList);
            tasksContainer.appendChild(addTaskButton);
            openAddTaskForm()
        }
        return tasksContainer;
    }

    function clearUserProjects() {
        const userProjectList = document.querySelector('.projects-user');
        userProjectList.innerHTML = '';
    }

    function clearTaskContainer() {
        const tasksContainer = document.querySelector('.task-projects-preview');
        tasksContainer.innerHTML = '';
    }

    function renderProjectsNav(title) {
        const userProjectList = document.querySelector('.projects-user');
        const userProjectButton = document.createElement('button');
        const userProjectIcon = document.createElement('i');
        const userProjectDeleteButton = document.createElement('button');
        const userProjectDeleteIcon = document.createElement('i');
        const projectTitleSpan = document.createElement('span');

        userProjectIcon.classList.add('fas', 'fa-list-check');
        userProjectDeleteIcon.classList.add('fas', 'fa-times');
        userProjectButton.classList.add('btn-project', 'btn-choose-project');
        userProjectDeleteButton.classList.add('btn-project-delete');
        projectTitleSpan.textContent = title;

        userProjectDeleteButton.appendChild(userProjectDeleteIcon);
        userProjectButton.appendChild(userProjectIcon);
        userProjectButton.appendChild(projectTitleSpan);
        userProjectButton.appendChild(userProjectDeleteButton);

        userProjectList.appendChild(userProjectButton);

        deleteProject();
        setActiveProject();
        return userProjectList;
    }


    function openAddTaskForm() {
        const openForm = document.querySelector('.btn-add-task');
        const form = document.querySelector('.add-task-form');
        openForm.addEventListener('click', (e) => {
            openForm.classList.add('active');
            form.classList.add('active');
        })
    }

    function hideAddTaskForm() {
        const form = document.querySelector('.add-task-form');
        form.classList.remove('active');
    }

})();




class Project {
    constructor(title){
        this.title = title;
        this.tasksList = [];
    }

    addTask(title, description, dueDate, priority) {
        this.tasksList.push(new Tasks(title, description, dueDate, priority));
    }

    getTitle() {
        return this.title;
    }

}

class Tasks {
    constructor(title, info, dueDate, priority) {
        this.title = title;
        this.info = info;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
    
    toggleCompleted() {
        this.completed === false ? this.completed = true : this.completed = false;
    }
    
    editTask(key, value) {
        this[key] = value;
    }
}



let projectList = [];
projectList.addProject = (title) => {
    projectList.push(new Project(title));
};

projectList.deleteProject = (position) => {
    projectList.splice(position, 1);
};

projectList.contains = (projectName) => {
    return projectList.some((project) => project.title === projectName)
}
projectList.addProject('Your Tasks');
projectList.addProject('Today');
projectList.addProject('This week');
console.log(projectList);

const test = new Project('New Project');

console.log(test.getTitle());



//     addTask(title, info, dueDate, priority) { 
//         this.tasksList.push(new Tasks(title, info, dueDate, priority));
//     }
// }

// class Tasks {
//     constructor(title, info, dueDate, priority) {
//         this.title = title;
//         this.info = info;
//         this.dueDate = dueDate;
//         this.priority = priority;
//         this.completed = false;
//     }

//     toggleCompleted() {
//         this.completed === false ? this.completed = true : this.completed = false;
//     }

//     editTask(key, value) {
//         this[key] = value;
//     }
// }


// export default Tasks;