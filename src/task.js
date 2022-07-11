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


export default Tasks;