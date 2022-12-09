/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Project = (title, tasks = []) => {

    return {
        title,
        tasks
    };

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ "./src/modules/ToDoList.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");



const Storage = (() => {

    function saveToDoList() {
        localStorage.setItem('projects', JSON.stringify(_ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects));
    }

    function loadToDoList() {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));
        if (storedProjects !== null) {
            _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects = storedProjects;
        } else {
            _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects = [ (0,_Project__WEBPACK_IMPORTED_MODULE_1__["default"])('All tasks') ];
        }
    }

    return {
        saveToDoList,
        loadToDoList,
    };

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Task = (title, dueDate) => {

    return {
        title,
        dueDate,
    };
    
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ }),

/***/ "./src/modules/ToDoList.js":
/*!*********************************!*\
  !*** ./src/modules/ToDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/modules/Storage.js");


const ToDoList = (() => {

    const projects = [];

    function addTask(task, projectTitle) {
        const project = this.projects.find(el => el.title === projectTitle);
        project.tasks.push(task);
        _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].saveToDoList();
    }

    function setDueDate(title, dueDate) {
        for (const project of this.projects) {
            const task = project.tasks.find(el => el.title === title);
            if (!task) { continue; }
            task.dueDate = dueDate;
            _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].saveToDoList();
            break;
        }
    }

    function removeTask(taskTitle) {
        for (const project of this.projects) {
            const task = project.tasks.find(el => el.title === taskTitle);
            const index = project.tasks.indexOf(task);
            if (index === -1) { continue; }
            project.tasks.splice(index, 1);
            _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].saveToDoList();
            break;
        }
    }

    function addProject(project) {
        this.projects.push(project);
        _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].saveToDoList();
    }

    return {
        projects,
        addTask,
        setDueDate,
        removeTask,
        addProject,
    };

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToDoList);

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDoList */ "./src/modules/ToDoList.js");




const UI = (() => {

    function loadUI() {
        _loadProject('All tasks');
        _initSidebar();
    }

    function _loadProject(title) {
        
        function addTaskElement(task) {

            function remove() {
                _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].removeTask(task.title);
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
                    _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].setDueDate(task.title, e.target.value);
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
                    const task = (0,_Task__WEBPACK_IMPORTED_MODULE_1__["default"])(input.value);
                    _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(task, project.title);
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

        const projects = _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].projects;
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
            const projects = _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].projects;
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
                    const project = (0,_Project__WEBPACK_IMPORTED_MODULE_0__["default"])(input.value);
                    _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(project);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Storage */ "./src/modules/Storage.js");



document.addEventListener('DOMContentLoaded', () => {
    _modules_Storage__WEBPACK_IMPORTED_MODULE_1__["default"].loadToDoList();
    _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"].loadUI();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvREFBTztBQUMzQyxvQkFBb0IsNERBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLEVBQUU7Ozs7OztVQ3RRakI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDVTtBQUN4QztBQUNBO0FBQ0EsSUFBSSxxRUFBb0I7QUFDeEIsSUFBSSwwREFBUztBQUNiLENBQUMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL21vZHVsZXMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9tb2R1bGVzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL21vZHVsZXMvVG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFByb2plY3QgPSAodGl0bGUsIHRhc2tzID0gW10pID0+IHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHRhc2tzXHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xyXG5cclxuY29uc3QgU3RvcmFnZSA9ICgoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZVRvRG9MaXN0KCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KFRvRG9MaXN0LnByb2plY3RzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZFRvRG9MaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlZFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICAgICAgaWYgKHN0b3JlZFByb2plY3RzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFRvRG9MaXN0LnByb2plY3RzID0gc3RvcmVkUHJvamVjdHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9Eb0xpc3QucHJvamVjdHMgPSBbIFByb2plY3QoJ0FsbCB0YXNrcycpIF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2F2ZVRvRG9MaXN0LFxyXG4gICAgICAgIGxvYWRUb0RvTGlzdCxcclxuICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTsiLCJjb25zdCBUYXNrID0gKHRpdGxlLCBkdWVEYXRlKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBkdWVEYXRlLFxyXG4gICAgfTtcclxuICAgIFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xyXG5cclxuY29uc3QgVG9Eb0xpc3QgPSAoKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHByb2plY3RzID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0YXNrLCBwcm9qZWN0VGl0bGUpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKGVsID0+IGVsLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgIHByb2plY3QudGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGUodGl0bGUsIGR1ZURhdGUpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgdGhpcy5wcm9qZWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gcHJvamVjdC50YXNrcy5maW5kKGVsID0+IGVsLnRpdGxlID09PSB0aXRsZSk7XHJcbiAgICAgICAgICAgIGlmICghdGFzaykgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgICAgICAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayh0YXNrVGl0bGUpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgdGhpcy5wcm9qZWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gcHJvamVjdC50YXNrcy5maW5kKGVsID0+IGVsLnRpdGxlID09PSB0YXNrVGl0bGUpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHByb2plY3QudGFza3MuaW5kZXhPZih0YXNrKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICBwcm9qZWN0LnRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICAgICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2plY3RzLFxyXG4gICAgICAgIGFkZFRhc2ssXHJcbiAgICAgICAgc2V0RHVlRGF0ZSxcclxuICAgICAgICByZW1vdmVUYXNrLFxyXG4gICAgICAgIGFkZFByb2plY3QsXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvRG9MaXN0OyIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XHJcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XHJcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0JztcclxuXHJcbmNvbnN0IFVJID0gKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkVUkoKSB7XHJcbiAgICAgICAgX2xvYWRQcm9qZWN0KCdBbGwgdGFza3MnKTtcclxuICAgICAgICBfaW5pdFNpZGViYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfbG9hZFByb2plY3QodGl0bGUpIHtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBhZGRUYXNrRWxlbWVudCh0YXNrKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZW1vdmUoKSB7XHJcbiAgICAgICAgICAgICAgICBUb0RvTGlzdC5yZW1vdmVUYXNrKHRhc2sudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1hcmtlZENvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3guY2xhc3NMaXN0LnJlbW92ZSgnZmEtc3F1YXJlJyk7XHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdmYS1zcXVhcmUtY2hlY2snKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocmVtb3ZlLCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEYXRlQ2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlUGlja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGRhdGVQaWNrZXIudHlwZSA9ICdkYXRlJztcclxuICAgICAgICAgICAgICAgIGRhdGVQaWNrZXIub25jbGljayA9IGUgPT4gZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGRhdGVQaWNrZXIub25jaGFuZ2UgPSBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3Quc2V0RHVlRGF0ZSh0YXNrLnRpdGxlLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVBpY2tlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0YXNrRHVlLmFwcGVuZChkYXRlUGlja2VyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVGl0bGUoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmQodGFzay50aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFJlbW92ZUJ1dHRvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYS10aW1lcycpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RfX3Rhc2tzX19pdGVtX19yZW1vdmUnKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5vbmNsaWNrID0gcmVtb3ZlO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKHJlbW92ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdF9fdGFza3NfX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdmYXInKTtcclxuICAgICAgICAgICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZCgnZmEtc3F1YXJlJyk7XHJcbiAgICAgICAgICAgIGNoZWNrYm94Lm9uY2xpY2sgPSBoYW5kbGVNYXJrZWRDb21wbGV0ZTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGNoZWNrYm94KTtcclxuXHJcbiAgICAgICAgICAgIGFkZFRpdGxlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgncHJvamVjdF9fdGFza3NfX2l0ZW1fX2R1ZURhdGUnKTtcclxuICAgICAgICAgICAgdGFza0R1ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZSB8fCAnTm8gZGF0ZSc7XHJcbiAgICAgICAgICAgIHRhc2tEdWUub25jbGljayA9IGhhbmRsZURhdGVDbGljaztcclxuICAgICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKHRhc2tEdWUpO1xyXG5cclxuICAgICAgICAgICAgYWRkUmVtb3ZlQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZChsaXN0SXRlbSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEFkZFRhc2tCdXR0b24oKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVTYXZlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBUYXNrKGlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBUb0RvTGlzdC5hZGRUYXNrKHRhc2ssIHByb2plY3QudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFRhc2tFbGVtZW50KHRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrSW5wdXRBcmVhLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRTYXZlQnV0dG9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RfX3Rhc2tJbnB1dEFyZWFfX2J0bicpXHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0X190YXNrSW5wdXRBcmVhX19idG4tLXNhdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlLnRleHRDb250ZW50ID0gJ0FkZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZS5vbmNsaWNrID0gaGFuZGxlU2F2ZTtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrSW5wdXRBcmVhLmFwcGVuZENoaWxkKHNhdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEJ1dHRvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWwuY2xhc3NMaXN0LmFkZCgncHJvamVjdF9fdGFza0lucHV0QXJlYV9fYnRuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RfX3Rhc2tJbnB1dEFyZWFfX2J0bi0tY2FuY2VsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsLm9uY2xpY2sgPSBjbG9zZUZvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0lucHV0QXJlYS5hcHBlbmRDaGlsZChjYW5jZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJbnB1dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIHRhc2tJbnB1dEFyZWEuY2xhc3NMaXN0LmFkZCgncHJvamVjdF9fdGFza0lucHV0QXJlYScpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgncHJvamVjdF9fdGFza0lucHV0QXJlYV9faW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGFkZFRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIHRhc2tJbnB1dEFyZWEuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2FuY2VsQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBhZGRTYXZlQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0RWxlbWVudC5hcHBlbmRDaGlsZCh0YXNrSW5wdXRBcmVhKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RfX2FkZFRhc2snKTtcclxuICAgICAgICAgICAgYWRkVGFza0J1dHRvbi5vbmNsaWNrID0gaGFuZGxlQ2xpY2s7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBUb0RvTGlzdC5wcm9qZWN0cztcclxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZChlbCA9PiBlbC50aXRsZSA9PT0gdGl0bGUpO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0X190aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdF9fdGFza3MnKTtcclxuXHJcbiAgICAgICAgdGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICBsaXN0LmlubmVySFRNTCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChwcm9qZWN0LnRpdGxlID09PSAnQWxsIHRhc2tzJykge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4gYWRkVGFza0VsZW1lbnQodGFzaykpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IGFkZFRhc2tFbGVtZW50KHRhc2spKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaW5pdEFkZFRhc2tCdXR0b24oKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2luaXRTaWRlYmFyKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRQcm9qZWN0RWxlbWVudChwcm9qZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcclxuICAgICAgICAgICAgICAgIF9sb2FkUHJvamVjdChwcm9qZWN0LnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYWN0aXZlRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19wcm9qZWN0c19fbGlzdCcpO1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX3Byb2plY3RzX19saXN0X19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX2xpbmsnKTtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS10YXNrcycpO1xyXG4gICAgICAgICAgICBsaXN0SXRlbS5hcHBlbmQoaWNvbik7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmFwcGVuZChwcm9qZWN0LnRpdGxlKTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0ub25jbGljayA9IGhhbmRsZUNsaWNrO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kKGxpc3RJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRQcm9qZWN0c0xpc3QoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzID0gVG9Eb0xpc3QucHJvamVjdHM7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3QudGl0bGUgPT09ICdBbGwgdGFza3MnKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0RWxlbWVudChwcm9qZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEFkZFByb2plY3RCdXR0b24oKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVBZGRQcm9qZWN0KCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZUNsb3NlSW5wdXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlU2F2ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9Eb0xpc3QuYWRkUHJvamVjdChwcm9qZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRQcm9qZWN0RWxlbWVudChwcm9qZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVDbG9zZUlucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGlkZUFkZFByb2plY3RCdXR0b24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFNhdmVCdXR0b24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhdmUuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9fcHJvamVjdHNfX2FkZF9fYnRuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZS5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX19wcm9qZWN0c19fYWRkX19idG4tLXNhdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlLnRleHRDb250ZW50ID0gJ0FkZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZS5vbmNsaWNrID0gaGFuZGxlU2F2ZTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zLmFwcGVuZChzYXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxCdXR0b24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX3Byb2plY3RzX19hZGRfX2J0bicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbC5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX19wcm9qZWN0c19fYWRkX19idG4tLWNhbmNlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbC50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbC5vbmNsaWNrID0gaGFuZGxlQ2xvc2VJbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zLmFwcGVuZChjYW5jZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19wcm9qZWN0cycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9fcHJvamVjdHNfX2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b25zLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX3Byb2plY3RzX19hZGRfX2J0bnMnKTtcclxuICAgICAgICAgICAgICAgIGhpZGVBZGRQcm9qZWN0QnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBhZGRDYW5jZWxCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIGFkZFNhdmVCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgIHByb2plY3RzRWxlbWVudC5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdHNFbGVtZW50LmFwcGVuZChidXR0b25zKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3Byb2plY3RzX19hZGQnKTtcclxuICAgICAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5vbmNsaWNrID0gaGFuZGxlQWRkUHJvamVjdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0QWxsVGFza3NCdXR0b24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19hbGxUYXNrcycpO1xyXG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIF9sb2FkUHJvamVjdCgnQWxsIHRhc2tzJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGFjdGl2ZUVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFByb2plY3RzTGlzdCgpO1xyXG4gICAgICAgIGluaXRBZGRQcm9qZWN0QnV0dG9uKCk7XHJcbiAgICAgICAgaW5pdEFsbFRhc2tzQnV0dG9uKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGxvYWRVSSB9O1xyXG5cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVJOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gJy4vbW9kdWxlcy9VSSc7XHJcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vbW9kdWxlcy9TdG9yYWdlJztcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBTdG9yYWdlLmxvYWRUb0RvTGlzdCgpO1xyXG4gICAgVUkubG9hZFVJKCk7XHJcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==