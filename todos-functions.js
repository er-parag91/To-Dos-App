// get todos from localstorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//Save todos to localstorage

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//removeTodos function
const removeTodos = (id) => {
    todos = todos.filter(todo => {
        return todo.id !== id
    })
}

//get the dom elements for individual todo
const generateTodoDom = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const p = document.createElement('span');
    const removeButton = document.createElement('button');

    //setup to do check box
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', (e) => {
        todo.completed = e.target.checked;
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    //setup to do text
    p.textContent = todo.title;
    containerEl.appendChild(p)

    //setup the container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup the remove button
    removeButton.textContent = 'Remove';
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodos(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters)
    })

    return todoEl
}
//Generate the summary of todos incompleted
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    console.log(incompleteTodos.length)
    const plural = incompleteTodos.length >= 1 ? 's' : ''
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left!`
    return summary
}
//render todos
const renderTodos = (todos, filters) => {
    let filteredTodos = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(filters.searchTodos.toLowerCase())
    })

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed
    })

    filteredTodos = filteredTodos.filter((todo) => {
        if (filters.checked) {
            return !todo.completed
        } else {
            return true
        }
    })

    document.querySelector('#todos').innerHTML = '';

    const summary = generateSummaryDOM(incompleteTodos)
    document.querySelector('#todos').appendChild(summary)

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            const todoEl = generateTodoDom(todo);
            document.querySelector('#todos').appendChild(todoEl)
        })
    } else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message');
        messageEl.textContent = 'No to-dos to show!';
        document.querySelector('#todos').appendChild(messageEl)
    }

}