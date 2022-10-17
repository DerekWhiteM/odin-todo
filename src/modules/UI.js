import Project from './Project';
import Task from './Task';
import ToDoList from './ToDoList';

const UI = (() => {

    function loadUI() {
        _loadProject('All tasks');
        _initSidebar();
    }

    function _loadProject(title) {
        
        function addTaskElement(task) {

            function remove() {
                ToDoList.removeTask(task.title);
                listItem.remove();
            }

            function handleMarkedComplete() {
                checkbox.classList.remove('fa-square');
                checkbox.classList.add('fa-square-check');
                setTimeout(remove, 500);
            }

            function handleDateClick() {
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
            }

            function addTitle() {
                const taskTitle = document.createElement('div');
                taskTitle.textContent = task.title;
                listItem.append(task.title);
            }

            function addRemoveButton() {
                const removeButton = document.createElement('i');
                removeButton.classList.add('fas');
                removeButton.classList.add('fa-times');
                removeButton.classList.add('project__tasks__item__remove');
                removeButton.onclick = remove;
                listItem.append(removeButton);
            }

            const listItem = document.createElement('li');
            listItem.classList.add('project__tasks__item');

            const checkbox = document.createElement('i');
            checkbox.classList.add('far');
            checkbox.classList.add('fa-square');
            checkbox.onclick = handleMarkedComplete;
            listItem.append(checkbox);

            addTitle();

            const taskDue = document.createElement('div');
            taskDue.classList.add('project__tasks__item__dueDate');
            taskDue.textContent = task.dueDate || 'No date';
            taskDue.onclick = handleDateClick;
            listItem.append(taskDue);

            addRemoveButton();
            
            list.append(listItem);

        }

        function initAddTaskButton() {

            function handleClick() {

                function handleSave() {
                    const task = Task(input.value);
                    ToDoList.addTask(task, project.title);
                    addTaskElement(task);
                    closeForm();
                }

                function closeForm() {
                    taskInputArea.remove();
                    addTaskButton.style.display = 'flex';
                }

                function addSaveButton() {
                    const save = document.createElement('button');
                    save.classList.add('project__taskInputArea__btn')
                    save.classList.add('project__taskInputArea__btn--save');
                    save.textContent = 'Add';
                    save.onclick = handleSave;
                    taskInputArea.appendChild(save);
                }

                function addCancelButton() {
                    const cancel = document.createElement('button');
                    cancel.classList.add('project__taskInputArea__btn');
                    cancel.classList.add('project__taskInputArea__btn--cancel');
                    cancel.textContent = 'Cancel';
                    cancel.onclick = closeForm;
                    taskInputArea.appendChild(cancel);
                }

                const projectElement = document.querySelector('.project');
                const taskInputArea = document.createElement('div');
                const input = document.createElement('input');
                taskInputArea.classList.add('project__taskInputArea');
                input.classList.add('project__taskInputArea__input');
                addTaskButton.style.display = 'none';
                taskInputArea.appendChild(input);
                addCancelButton();
                addSaveButton();
                projectElement.appendChild(taskInputArea);
                input.focus();

            }

            const addTaskButton = document.querySelector('.project__addTask');
            addTaskButton.onclick = handleClick;

        }

        const projects = ToDoList.projects;
        const project = projects.find(el => el.title === title);
        const titleElement = document.querySelector('.project__title');
        const list = document.querySelector('.project__tasks');

        titleElement.textContent = project.title;
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

            function handleClick() {
                _loadProject(project.title);
                const activeElements = document.getElementsByClassName('active');
                for (const element of activeElements) {
                    element.classList.remove('active');
                }
                listItem.classList.add('active');
            }

            const projectsList = document.querySelector('.sidebar__projects__list');
            const listItem = document.createElement('li');
            const icon = document.createElement('i');
            listItem.classList.add('sidebar__projects__list__item');
            listItem.classList.add('sidebar__link');
            icon.classList.add('fas');
            icon.classList.add('fa-tasks');
            listItem.append(icon);
            listItem.append(project.title);
            listItem.onclick = handleClick;
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

            function handleAddProject() {

                function handleCloseInput() {
                    input.remove();
                    buttons.remove();
                    addProjectButton.style.display = 'flex';
                }

                function handleSave() {
                    const project = Project(input.value);
                    ToDoList.addProject(project);
                    addProjectElement(project);
                    handleCloseInput();
                }

                function hideAddProjectButton() {
                    addProjectButton.style.display = 'none';
                }

                function addSaveButton() {
                    const save = document.createElement('button');
                    save.classList.add('sidebar__projects__add__btn');
                    save.classList.add('sidebar__projects__add__btn--save');
                    save.textContent = 'Add';
                    save.onclick = handleSave;
                    buttons.append(save);
                }

                function addCancelButton() {
                    const cancel = document.createElement('button');
                    cancel.classList.add('sidebar__projects__add__btn');
                    cancel.classList.add('sidebar__projects__add__btn--cancel');
                    cancel.textContent = 'Cancel';
                    cancel.onclick = handleCloseInput;
                    buttons.append(cancel);
                }

                const projectsElement = document.querySelector('.sidebar__projects');
                const input = document.createElement('input');
                input.classList.add('sidebar__projects__input');
                const buttons = document.createElement('div');
                buttons.classList.add('sidebar__projects__add__btns');
                hideAddProjectButton();
                addCancelButton();
                addSaveButton();
                projectsElement.append(input);
                projectsElement.append(buttons);
                input.focus();

            }

            const addProjectButton = document.querySelector('.sidebar__projects__add');
            addProjectButton.onclick = handleAddProject;

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