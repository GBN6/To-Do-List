import Tasks from "./task";

class Project {
    constructor(title){
        this.title = title;
        this.tasksList = [];
    }


    addTask(title, info, dueDate, priority) { 
        this.tasksList.push(new Tasks(title, info, dueDate, priority));
    }
}
export default Project;