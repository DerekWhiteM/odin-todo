import Storage from './Storage';

const ToDoList = (() => {

    const projects = [];

    function addTask(task, projectTitle) {
        const project = this.projects.find(el => el.title === projectTitle);
        project.tasks.push(task);
        Storage.saveToDoList();
    }

    function setDueDate(title, dueDate) {
        for (const project of this.projects) {
            const task = project.tasks.find(el => el.title === title);
            if (task) {
                task.dueDate = dueDate;
                Storage.saveToDoList();
                break;
            }
        }
    }

    function removeTask(taskTitle) {
        for (const project of this.projects) {
            const task = project.tasks.find(el => el.title === taskTitle);
            const index = project.tasks.indexOf(task);
            if (index !== -1) {
                project.tasks.splice(index, 1);
                break;
            }
        }
        Storage.saveToDoList();
    }

    function addProject(project) {
        this.projects.push(project);
        Storage.saveToDoList();
    }

    return {
        projects,
        addTask,
        setDueDate,
        removeTask,
        addProject,
    };

})();

export default ToDoList;