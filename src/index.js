import Tasks from "./task";
import Project from "./project";


let test = new Tasks("Try This", "Attempt to make a todo", new Date().toDateString(), "High", true);

console.log(test);
test.toggleCompleted();
console.log(test);

