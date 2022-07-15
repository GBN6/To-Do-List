import { toDate, isToday, isThisWeek, subDays } from 'date-fns'
//     DOM

const UI = (() => {
    setActiveProject();
    const createNewProjectButton = document.querySelector('.btn-project-user');
    const addNewTask = document.querySelector('.add-task');
    createNewProjectButton.addEventListener('click', displayProjectInput);
    addNewTask.addEventListener('submit', addNewTaskToList);
    

    function displayProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');
        const addNewProject = document.querySelector('.btn-add-project-popup');
        const closeProject = document.querySelector('.btn-close-poject-popup');

        addNewProject.addEventListener('click', addProject)
        newProjectPopup.classList.add('active');
        createNewProjectButton.classList.add('active');

        closeProject.addEventListener('click', () => {
            createNewProjectButton.classList.remove('active');
            newProjectPopup.classList.remove('active')
        })
    }

    function closeProjectInput() {
        const newProjectPopup = document.querySelector('.add-project-popup');

        createNewProjectButton.classList.remove('active');
        newProjectPopup.classList.remove('active');
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
        renderTasksList(projectTitle);
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
        projectName.classList.add('current-project');
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
            openAddTaskForm();
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
        const formContainer = document.querySelector('.add-task-form');
        openForm.addEventListener('click', () => {
            openForm.classList.add('active');
            formContainer.classList.add('active');
        })

    }

    function closeAddTaskForm() {
        const openForm = document.querySelector('.btn-add-task');
        const formContainer = document.querySelector('.add-task-form');
        openForm.classList.remove('active');
        formContainer.classList.remove('active');
    }

    function addNewTaskToList(e) {
        e.preventDefault();
        const projectName = document.querySelector('.current-project').textContent;
        const taskTitle = document.querySelector('#input-task-title').value;
        const taskInfo = document.querySelector('#input-task-info').value;
        const taskDate = document.querySelector('#input-task-date').value;
        const taskPriority = document.querySelector('.input-task-priority').value;
        const taskTitleErorr = document.querySelector('.task-name-error')
        let i = projectList.index(projectName);
        if(projectList[i].contains(taskTitle))
        {
            taskTitleErorr.textContent = 'Tasks must have different names';
            return;
        }

        taskTitleErorr.textContent = '';
        projectList[i].addTask(taskTitle, taskInfo, taskDate, taskPriority);
        e.target.reset();
        hideAddTaskForm();
        renderTasksList(projectName);
        closeAddTaskForm()
        console.log(projectList);
        }        

    function hideAddTaskForm() {
        const formContainer = document.querySelector('.add-task-form');
        formContainer.classList.remove('active');
    }

    function renderTasksList(projectName) {
        let ind = projectList.index(projectName);
        const tasksContainer = document.querySelector('.task-list');
        tasksContainer.innerHTML = '';
        projectList[ind].tasksList.forEach((task, i) => {
            const taskDiv = document.createElement('div');
            const checkedButton = document.createElement('button');
            const taskName = document.createElement('div');
            const taskInfoButton = document.createElement('button');
            const taskDate = document.createElement('div')
            const editTask = document.createElement('button');
            const editTaskIcon = document.createElement('i');
            const deleteTask = document.createElement('button');
            const deleteTaskIcon = document.createElement('i');

            taskDiv.classList.add('task');
            taskDiv.setAttribute('data-project', `${projectName}`)
            taskDiv.setAttribute('data-index', `${i}`)
            checkedButton.classList.add('btn-task-checked');
            taskName.classList.add('task-name');
            taskInfoButton.classList.add('btn-task-info');
            taskDate.classList.add('task-date');
            editTask.classList.add('btn-task-edit');
            editTaskIcon.classList.add('fas', 'fa-pen-to-square')
            deleteTask.classList.add('btn-task-delete');
            deleteTaskIcon.classList.add('fas', 'fa-trash-can');

            taskName.textContent = `${task.title}`
            taskInfoButton.textContent = 'Details'
            taskDate.textContent = `${task.dueDate}`;
            priorityCheck(taskDiv, task.priority);
            toggleDoneTask(checkedButton, task, task.completed, taskDiv);


            deleteTask.appendChild(deleteTaskIcon);
            editTask.appendChild(editTaskIcon);
            taskDiv.appendChild(checkedButton);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskInfoButton);
            taskDiv.appendChild(taskDate);
            taskDiv.appendChild(editTask);
            taskDiv.appendChild(deleteTask);
            tasksContainer.appendChild(taskDiv);

            checkedButton.addEventListener('click', () => {
                task.toggleCompleted();
                console.log(projectList);
                renderTasksList(projectName);
            });
            deleteTask.addEventListener('click', (e) => {
                let taskDlt = document.querySelector(`div[data-index="${i}"]`)
                tasksContainer.removeChild(taskDlt);
                projectList[ind].deleteTask(i);
                console.log(projectList);
            })

            return tasksContainer;

        });

        function priorityCheck(container, value) {
            if (value === 'low')
            {
                container.classList.add('task-low');
            }
            else if (value === 'medium')
            {
                container.classList.add('task-medium');
            }
            else if (value === 'high')
            {
                container.classList.add('task-high');
            }
            return container;
        }
        
        function toggleDoneTask(button, task, value, container) {
            const completedIcon = document.createElement('i');
            completedIcon.classList.add('fas', 'fa-check')
            if (value === true)
            {
                container.classList.add('completed');
                button.appendChild(completedIcon);
                console.log(button);
            }
            else 
            {
                container.classList.remove('completed');
                button.innerHTML = '';
            }
            return container;
        }
    }

    // function submitTaskForm(e) {
    //     e.preventdefault();
    //     const projectName = document.querySelector('.current-project').textContent;
    //     const taskTitle = document.querySelector('.input-task-title').value;
    //     const taskInfo = document.querySelector('.input-task-info').value;
    //     const taskDate = document.querySelector('.input-task-date').value;
    //     const taskPriority = document.querySelector('.input-task-priority').value;
    //     let getCurrentProject = projectList.filter((project) => project.getTitle() === projectName);
    //     e.reset();
    //     getCurrentProject.addTask(taskTitle, taskInfo, taskDate, taskPriority);
    //     hideAddTaskForm();
    //     console.log(getCurrentProject);
    // }

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
    contains(taskName) {
        return this.tasksList.some((task) => task.title === taskName)
    }
    deleteTask(index) {
        this.tasksList.splice(index, 1);
    };

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

projectList.index = (projectName) => {
    for (let i = 0; i < projectList.length; i++)
    {
        if (projectName === projectList[i].getTitle())
        {
            return i;
        }
    }
}
projectList.addProject('Your Tasks');
projectList.addProject('Today');
projectList.addProject('This week');
projectList[0].addTask('Task', 'DETAILS', '15.07.2022', 'low');
projectList[0].addTask('Task2', 'DETAILS', '15.07.2022', 'high');
projectList[0].addTask('Task3', 'DETAILS', '15.07.2022', 'medium');
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