import UI from './modules/UI';
import Storage from './modules/Storage';

document.addEventListener('DOMContentLoaded', () => {
    Storage.loadToDoList();
    UI.loadUI();
});