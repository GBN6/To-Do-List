import { toDate, isToday, isThisWeek, subDays } from 'date-fns'
import Tasks from './task';


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
    getTasksToday() {
        return this.tasksList.filter((task) => {
          const taskDate = new Date(task.getDate())
          return isToday(toDate(taskDate))
        })
      }
    getTasksThisWeek() {
        return this.tasksList.filter((task) => {
        const taskDate = new Date(task.getDate())
        return isThisWeek(subDays(toDate(taskDate), 1));
        })
    }
}


export default Project;