function Model() {
    this.data = [];
}

Model.prototype.isUnique = function(value) {
    if (this.data.indexOf(value) === -1) {
        return true;
    } else {
        return false;
    }
};

Model.prototype.getIndex = function(value) {
    return this.data.indexOf(value);
};

Model.prototype.add = function(value) {
    this.data.push(value);
};

Model.prototype.edit = function(index, value) {
    this.data[index] = value;
};

Model.prototype.delete = function(value) {
    var index = this.getIndex(value);
    this.data.splice(index, 1);
};

function Controller(view, model) {

    this.init = function () {
        view.controls.form.onsubmit = function (e) {
            e.preventDefault();
        };
        view.controls.addButton.onclick = addTodo;
        view.controls.todoContainer.onchange = completeTodo;
        view.controls.todoContainer.onclick = editDeleteTodo;
    };

    function addTodo() {
        var value = view.getInputValue();

        if (!value || !model.isUnique(value)) {
            return;
        }

        view.addTodo(value);
        model.add(value);

        console.log(model.data);
    }

    function completeTodo(e) {
        var checkbox = e.target;
        var value = view.getTodoValue(checkbox);
        view.completeTodo(checkbox, value);
        model.delete(value);

        console.log(model.data);
    }

    function editDeleteTodo(e) {
        var target = e.target;
        if (target.tagName !== 'BUTTON') {
            return;
        }

        if (target.classList.contains('edit')) {
            var currentValue = view.getTodoValue(target);
            var index = model.getIndex(currentValue);
            var newValue = view.promptUser(currentValue);

            if (!model.isUnique(newValue)) {
                return;
            }

            view.editTodo(target, newValue);
            model.edit(index, newValue);
        } else if (target.classList.contains('delete')) {
            var value = view.getTodoValue(target);
            view.deleteTodo(target);
            model.delete(value);
        }

        console.log(model.data);
    }
}

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


var view = new View();
var model = new Model();
var controller = new Controller(view, model);
controller.init();

