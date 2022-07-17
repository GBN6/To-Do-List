import Project from "./project";
import Tasks from "./task";
import projectList from "./projectList";


//Set up some new methods to make dealing with localStorage easier:
function setLocalObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
  
function getLocalObject(key) {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
}
  
function saveLocally() {
    setLocalObject("projectList", projectList);
}
  
function downloadLocally() {
    let downloadedList = getLocalObject('projectList');
    console.log(downloadedList.length);
    if (downloadedList === null || !downloadedList.length) return;
    for (let i = 0; i < downloadedList.length; i++) { //JSON can't store functions, so each project/to-do is added again as a new objects to return their lost methods.
      projectList.push(new Project(downloadedList[i].title));
      for (let j = 0; j < downloadedList[i].tasksList.length; j++) {
        projectList[i].tasksList.push(new Tasks(downloadedList[i].tasksList[j].title, downloadedList[i].tasksList[j].info, downloadedList[i].tasksList[j].dueDate, downloadedList[i].tasksList[j].priority));
        projectList[i].tasksList[j].completed = downloadedList[i].tasksList[j].completed;
      }
    }
}
  
export {saveLocally, downloadLocally};