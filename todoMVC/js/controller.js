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