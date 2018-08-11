function Model() {
    
}

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
        var todoValue = readInput();

        if (!todoValue) {
            return;
        }

        var todo = document.createElement('div');
        var template = '<label><input type="checkbox"><span>' + todoValue + '</span></label>';
        template += '<button class="edit">Edit</button><button class="delete">Delete</button>';
        todo.innerHTML = template;

        todoContainer.insertBefore(todo, todoContainer.firstElementChild);
    }

    function completeTodo(e) {
        var checkbox = e.target;

        if (!checkbox.checked) {
            return;
        }

        var todoText = checkbox.nextElementSibling.textContent;
        var completed = document.createElement('p');
        completed.textContent = todoText;
        completedContainer.appendChild(completed);
    }

    function editDeleteTodo(e) {
        var target = e.target;

        if (target.tagName !== 'BUTTON') {
            return;
        }

        if (target.classList.contains('edit')) {
            editTodo(target);
        } else if (target.classList.contains('delete')) {
            deleteTodo(target);
        }
    }

    function editTodo(button) {
        var todoText = button.previousElementSibling.textContent;
        todoText = prompt('Enter new todo text', todoText);
        button.previousElementSibling.lastElementChild.textContent = todoText;
    }

    function deleteTodo(button) {
        todoContainer.removeChild(button.parentElement);
    }

    function readInput() {
        var value = input.value;

        if (value.length === 0) {
            return false;
        }

        return value;
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

var view = new View();
var model = new Model();

var controller = new Controller(view, model);
controller.init();

