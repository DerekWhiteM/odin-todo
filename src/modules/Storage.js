import ToDoList from './ToDoList';
import Project from './Project';

const Storage = (() => {

    function saveToDoList() {
        localStorage.setItem('projects', JSON.stringify(ToDoList.projects));
    }

    function loadToDoList() {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects !== null) {
            ToDoList.projects = storedProjects;
        } else {
            ToDoList.projects = [ Project('All tasks') ];
        }
    }

    return {
        saveToDoList,
        loadToDoList,
    };

})();

export default Storage;