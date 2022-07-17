import Project from './project'
import Tasks from './task';
import {saveLocally} from './storage';

let projectList = [];

projectList.addProject = (title) => {
    projectList.push(new Project(title));
    saveLocally();
};

projectList.deleteProject = (position) => {
    projectList.splice(position, 1);
    saveLocally();
};

projectList.contains = (projectName) => {
    return projectList.some((project) => project.title === projectName);
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

projectList.updateTodayProject = () => {
    projectList[1].tasksList = [];

    projectList.forEach((project) => {
      if (project.title === 'Today' || project.title === 'This week')
        return;

      const todayTasks = project.getTasksToday();
      todayTasks.forEach((task) => {
        const taskName = `${task.title} (${project.title})`
        projectList[1].addTask(taskName, task.info, task.getDate(), task.priority)
      })
    })
}

projectList.updateWeekProject = () => {
    projectList[2].tasksList = [];

    projectList.forEach((project) => {
      if (project.title === 'Today' || project.title === 'This week')
        return

      const weekTasks = project.getTasksThisWeek()
      weekTasks.forEach((task) => {
        const taskName = `${task.title} (${project.title})`
        projectList[2].addTask(taskName, task.info, task.getDate(), task.priority)
      })
    })
}

export default projectList;