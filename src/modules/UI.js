import ToDoList from './ToDoList';
import Task from './Task';
import Project from './Project';

const UI = (() => {

    function loadUI() {
        _loadProject('All tasks');
        _initSidebar();
    }

    function _loadProject(title) {
        
        function addTaskElement(task) {
            const listItem = document.createElement('li');
            listItem.classList.add('project__tasks__item');
            const checkbox = document.createElement('i');
            checkbox.classList.add('far');
            checkbox.classList.add('fa-square');
            checkbox.onclick = () => {
                checkbox.classList.remove('fa-square');
                checkbox.classList.add('fa-square-check');
                setTimeout(() => {
                    ToDoList.removeTask(task.title);
                    listItem.remove();
                }, 500);
            };
            const taskTitle = document.createElement('div');
            taskTitle.textContent = task.title;
            const taskDue = document.createElement('div');
            taskDue.classList.add('project__tasks__item__dueDate');
            taskDue.textContent = task.dueDate || 'No date';
            taskDue.addEventListener('click', () => {
                console.log('date');
                taskDue.textContent = '';
                const datePicker = document.createElement('input');
                datePicker.type = 'date';
                datePicker.onclick = e => e.stopPropagation();
                datePicker.onchange = e => {
                    taskDue.textContent = e.target.value;
                    ToDoList.setDueDate(task.title, e.target.value);
                    datePicker.remove();
                };
                taskDue.append(datePicker);
            });
            const removeButton = document.createElement('i');
            removeButton.classList.add('fas');
            removeButton.classList.add('fa-times');
            removeButton.classList.add('project__tasks__item__remove');
            removeButton.addEventListener('click', () => {
                ToDoList.removeTask(task.title);
                listItem.remove();
            });
            listItem.append(checkbox);
            listItem.append(task.title);
            listItem.append(taskDue);
            listItem.append(removeButton);
            list.append(listItem);
        }

        function initAddTaskButton() {
            const addTaskButton = document.querySelector('.project__addTask');
            const projectElement = document.querySelector('.project');
            addTaskButton.onclick = () => {
                const taskInputArea = document.createElement('div');
                taskInputArea.classList.add('project__taskInputArea');
                const input = document.createElement('input');
                input.classList.add('project__taskInputArea__input');
                const save = document.createElement('button');
                save.classList.add('project__taskInputArea__btn')
                save.classList.add('project__taskInputArea__btn--save');
                save.textContent = 'Add';
                save.addEventListener('click', () => {
                    const task = Task(input.value);
                    ToDoList.addTask(task, project.title);
                    addTaskElement(task);
                    taskInputArea.remove();
                    addTaskButton.style.display = 'flex';
                });
                const cancel = document.createElement('button');
                cancel.classList.add('project__taskInputArea__btn');
                cancel.classList.add('project__taskInputArea__btn--cancel');
                cancel.textContent = 'Cancel';
                cancel.addEventListener('click', () => {
                    taskInputArea.remove();
                    addTaskButton.style.display = 'flex';
                });
                addTaskButton.style.display = 'none';
                taskInputArea.appendChild(input);
                taskInputArea.appendChild(cancel);
                taskInputArea.appendChild(save);
                projectElement.appendChild(taskInputArea);
                input.focus();
            };
        }

        const projects = ToDoList.projects;
        const project = projects.find(el => el.title === title);
        const titleElement = document.querySelector('.project__title');
        titleElement.textContent = project.title;
        const list = document.querySelector('.project__tasks');
        list.innerHTML = null;
        if (project.title === 'All tasks') {
            projects.forEach(project => project.tasks.forEach(task => addTaskElement(task)))
        } else {
            project.tasks.forEach(task => addTaskElement(task));
        }
        initAddTaskButton();

    }

    function _initSidebar() {

        function addProjectElement(project) {
            const projectsList = document.querySelector('.sidebar__projects__list');
            const listItem = document.createElement('li');
            listItem.classList.add('sidebar__projects__list__item');
            listItem.classList.add('sidebar__link');
            const icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-tasks');
            listItem.append(icon);
            listItem.append(project.title);
            listItem.onclick = () => {
                _loadProject(project.title);
                const activeElements = document.getElementsByClassName('active');
                console.log(activeElements)
                for (const element of activeElements) {
                    element.classList.remove('active');
                }
                listItem.classList.add('active');
            };
            projectsList.append(listItem);
        }

        function initProjectsList() {
            const projects = ToDoList.projects;
            for (const project of projects) {
                if (project.title === 'All tasks') { continue; }
                addProjectElement(project);
            }
        }

        function initAddProjectButton() {
            const addProjectButton = document.querySelector('.sidebar__projects__add');
            const projectsElement = document.querySelector('.sidebar__projects');
            addProjectButton.onclick = () => {
                const input = document.createElement('input');
                input.classList.add('sidebar__projects__input');
                addProjectButton.style.display = 'none';
                projectsElement.append(input);

                const buttons = document.createElement('div');
                buttons.classList.add('sidebar__projects__add__btns');

                const save = document.createElement('button');
                save.classList.add('sidebar__projects__add__btn');
                save.classList.add('sidebar__projects__add__btn--save');
                save.textContent = 'Add';
                save.onclick = () => {
                    const project = Project(input.value);
                    ToDoList.addProject(project);
                    addProjectElement(project);
                    input.remove();
                    buttons.remove();
                    addProjectButton.style.display = 'flex';
                };

                const cancel = document.createElement('button');
                cancel.classList.add('sidebar__projects__add__btn');
                cancel.classList.add('sidebar__projects__add__btn--cancel');
                cancel.textContent = 'Cancel';
                cancel.onclick = () => {
                    input.remove();
                    buttons.remove();
                    addProjectButton.style.display = 'flex';
                };

                buttons.append(cancel);
                buttons.append(save);

                projectsElement.append(buttons);

                input.focus();
            }
        }

        function initAllTasksButton() {
            const button = document.querySelector('.sidebar__allTasks');
            button.onclick = () => {
                _loadProject('All tasks');
                const activeElements = document.getElementsByClassName('active');
                for (const element of activeElements) {
                    element.classList.remove('active');
                }
                button.classList.add('active');
            }
        }

        initProjectsList();
        initAddProjectButton();
        initAllTasksButton();

    }

    return { loadUI };

})();

export default UI;