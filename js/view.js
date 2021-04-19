import AddTodo from './components/add_todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoform = new AddTodo();
        this.addTodoform.onclick((title, description) => this.addTodo(title, description));
        this.modal = new Modal();
        this.filters = new Filters();
        this.modal.onclick((id,values) => this.editTodo(id,values));
        this.filters.onclick((filters) => this.filter(filters));
    }

    render(){
        const todos = this.model.getTodos();
        // for(const todo of todos){
        //     this.createRow(todo);
        // }

        //Programacion funcional.

        todos.forEach((todo) => this.createRow(todo));
    }

    filter(filters){
        const {type, words} = filters;
        //Destructuración, no me importa lo que venga antes solo toma el resto y expandelo.
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows){
            const [title, description, completed] = row.children;
            let shouldHide = false;
            if (words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;
            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }
        
            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
            console.log(row, shouldHide);
        }
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title, description) {
        const todo = this.model.addTodo(title,description);
        this.createRow(todo);
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    editTodo(id,values){
        // console.log(id);
        // console.log(values);
        this.model.editTodo(id,values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo){
        const row = table.insertRow();
            row.setAttribute('id',todo.id)
            row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">

            </td>
            <td class="text-right">
                
            </td>
            `;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.onclick = () => this.toggleCompleted(todo.id);
            row.children[2].appendChild(checkbox);

            const editBtn= document.createElement('button');
            editBtn.classList.add('btn','btn-primary','mb-1');
            editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
            editBtn.setAttribute('data-toggle','modal');
            editBtn.setAttribute('data-target', '#modal');
            editBtn.onclick = () => this.modal.setValues(todo);
            row.children[3].appendChild(editBtn);

            const removeBtn= document.createElement('button');
            removeBtn.classList.add('btn','btn-danger','mb-1','ml-1');
            removeBtn.innerHTML = `<i class="fa fa-trash"></i>`;
            removeBtn.onclick = () => this.removeTodo(todo.id);
            row.children[3].appendChild(removeBtn);
    }
}