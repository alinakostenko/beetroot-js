function View() {
    this.controls = {
        input: document.forms.addTodo.elements.inputTodoText,
        addButton: document.getElementById('add'),
        todoContainer: document.getElementsByClassName('todoContainer')[0],
        completedContainer: document.getElementsByClassName('completedContainer')[0],
        form: document.forms.addTodo
    };
}

View.prototype.getInputValue = function () {
    return this.controls.input.value;
};

View.prototype.getTodoValue = function(element) {
    var todo = element.closest('.todo');
    return todo.querySelector('.todo-text').textContent;
};

View.prototype.addTodo = function(todoValue) {
    var todo = document.createElement('div');
    todo.className = 'todo';
    var template = '<div class="todo-wrapper"><label><input type="checkbox"><span class="todo-text">' + todoValue + '</span></label>';
    template += '<button class="edit">Edit</button><button class="delete">Delete</button></div>';
    todo.innerHTML = template;

    this.controls.todoContainer.insertBefore(todo, this.controls.todoContainer.firstElementChild);
    this.controls.input.value = '';
};

View.prototype.completeTodo = function(checkbox, todoText) {
    var completed = document.createElement('p');
    completed.textContent = todoText;
    this.controls.completedContainer.appendChild(completed);
    var todo = checkbox.closest('.todo');
    this.controls.todoContainer.removeChild(todo);
};

View.prototype.promptUser = function(todoText) {
    return prompt('Enter new todo text', todoText);
};

View.prototype.editTodo = function(button, todoText) {
    button.previousElementSibling.lastElementChild.textContent = todoText;
};

View.prototype.deleteTodo = function(button) {
    this.controls.todoContainer.removeChild(button.closest('.todo'));
};