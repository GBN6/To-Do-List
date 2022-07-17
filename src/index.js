import Project from "./project";
import Tasks from "./task";
import projectList from "./projectList";
import {saveLocally, downloadLocally} from './storage';

//     DOM

const UI = (() => {
    setActiveProject();
    const createNewProjectButton = document.querySelector('.btn-project-user');
    const addNewTask = document.querySelector('.add-task');
    const cancelAddTaskForm = document.querySelector('.input-task-cancel-btn');
    const openNav = document.querySelector('.btn-nav-open')

    createNewProjectButton.addEventListener('click', displayProjectInput);
    addNewTask.addEventListener('submit', addNewTaskToList);
    cancelAddTaskForm.addEventListener('click', closeAddTaskForm)
    openNav.addEventListener('click', () => {
        const nav = document.querySelector('.nav')
        nav.classList.toggle('active');
    })
    

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
        projectList.updateTodayProject();
        projectList.updateWeekProject();
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
        closeAddTaskForm();
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
            taskDate.textContent = `${task.getDateFormatted()}`;
            priorityCheck(taskDiv, task.priority);
            toggleDoneTask(checkedButton, task, task.completed, taskDiv);


            deleteTask.appendChild(deleteTaskIcon);
            editTask.appendChild(editTaskIcon);
            taskDiv.appendChild(checkedButton);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskInfoButton);
            taskDiv.appendChild(taskDate);
            // taskDiv.appendChild(editTask);
            taskDiv.appendChild(deleteTask);
            tasksContainer.appendChild(taskDiv);

            checkedButton.addEventListener('click', () => {
                task.toggleCompleted();
                renderTasksList(projectName);
            });
            deleteTask.addEventListener('click', (e) => {
                let taskDlt = document.querySelector(`div[data-index="${i}"]`)
                tasksContainer.removeChild(taskDlt);
                projectList[ind].deleteTask(i);
            })

            taskInfoButton.addEventListener('click', () =>{
                openDetailsModal(projectName, task.title, task.getDateFormatted(), task.priority, task.info);
            })

            return tasksContainer;

        });

        function openDetailsModal(projectName, taskTitle, dueDate, priority, details) {
            const modal = document.querySelector('.modal');
            const modalCloseButton = document.querySelector('.modal-close');
            const modalTitle = document.querySelector('.modal-title');
            const modalProject = document.querySelector('.modal-pn');
            const modalDate = document.querySelector('.modal-dd');
            const modalPriority = document.querySelector('.modal-pr');
            const modalDetails = document.querySelector('.modal-de');

            modal.style.display = 'flex';
            modalTitle.textContent = taskTitle;
            modalProject.textContent = projectName;
            modalDate.textContent = dueDate;
            modalPriority.textContent = priority;
            modalDetails.textContent = details;

            modalCloseButton.onclick = () => {
                modal.style.display = 'none';
            }

            window.onclick = (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none'
                }
            }
        }

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
            }
            else 
            {
                container.classList.remove('completed');
                button.innerHTML = '';
            }
            return container;
        }
    }
    return {renderProjectList};
})();

window.addEventListener('DOMContentLoaded', UI.renderProjectList);
if (projectList.length === 0) {
    projectList.addProject('Your Tasks');
    projectList.addProject('Today');
    projectList.addProject('This week');
    projectList[0].addTask('Learn HTML', 'I should practice HTML', '2022-07-17', 'low');
    projectList[0].addTask('Learn CSS', 'I should practice CSS', '2022-07-17', 'high');
    projectList[0].addTask('Learn JS', 'I should practice JS', '2022-07-16', 'medium');
    let todayDate = new Date().toISOString().slice(0, 10);
    const test = new Project('Project Example');
    projectList.push(test);
    test.addTask('Check GBN GitHub', 'I should checkout this guy github, maybe he has more interesting projects', todayDate, 'low');
}
console.log(!projectList.length);
downloadLocally();
console.log(projectList);