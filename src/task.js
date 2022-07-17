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

    getDateFormatted() {
        const year = this.dueDate.split('-')[0]
        const month = this.dueDate.split('-')[1]
        const day = this.dueDate.split('-')[2]
        return `${day}/${month}/${year}`;
    }

    getDate() {
        return this.dueDate
    }
}

export default Tasks;