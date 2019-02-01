let todos = getSavedTodos()

let checked;
const filters = {
    searchTodos: '',
    checked: false
}

renderTodos(todos, filters);


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchTodos = e.target.value;

    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = {
        id: uuidv4(),
        title: e.target.title.value,
        completed: false
    }
    if (newTodo.title !== '') {
        todos.push(newTodo);
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.title.value = '';
    } else {
        alert('Please enter valid Todo!')
    }
})


document.querySelector('#checked').addEventListener('change', (e) => {
    filters.checked = e.target.checked
    renderTodos(todos, filters)
})