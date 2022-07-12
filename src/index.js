//     DOM
const createProject = (() => {
    setActiveProject();
    const createNewProjectButton = document.querySelector('.btn-project-user');

    createNewProjectButton.addEventListener('click', displayProjectInput)

    function displayProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');
        const addNewProject = document.querySelector('.btn-add-project-popup');

        addNewProject.addEventListener('click', addProject)
        newProjectPopup.classList.add('active');
        createNewProjectButton.classList.add('active');
        closeProjectInput();
    }

    function closeProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');
        const addNewProject = document.querySelector('.btn-add-project-popup');
        const closeProject = document.querySelector('.btn-close-poject-popup');
        addNewProject.addEventListener('click', () => {
            createNewProjectButton.classList.remove('active');
            newProjectPopup.classList.remove('active')
        })
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
                }         
            }
        }))
    }

    function setActiveProject() {
        const activeProject = document.querySelectorAll('.btn-choose-project')
        activeProject.forEach((element) => element.addEventListener('click', (e) => {
            console.log(e.target.textContent.trim());
        })
    )}

    function clearUserProjects() {
        const userProjectList = document.querySelector('.projects-user');
        userProjectList.innerHTML = '';
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
        return userProjectList;
    }

})();




class Project {
    constructor(title){
        this.title = title;
        this.tasksList = [];
    }

    getTitle() {
        return this.title;
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