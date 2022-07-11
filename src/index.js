import Tasks from "./task";
import Project from "./project";


let test = new Tasks("Try This", "Attempt to make a todo", new Date().toDateString(), "High", true);

let test2 = new Project('New Project');

test2.addTask("Try This", "Attempt to make a todo", new Date().toDateString(), "High", true);
console.log(test2);


