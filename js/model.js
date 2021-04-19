export default class Model{
    constructor(){
        this.view = null;
        // this.todos = [];
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if(!this.todos || this.todos.length < 1){
            this.todos = [
                {
                    id:0,
                    title:'Learn JS',
                    description:'Watch JS Tutorials',
                    completed: false,
                }
            ]
            this.currentId = 1;
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos;
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    editTodo(id, values){
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        // console.log(this.todos);
        // console.log(id);
        this.save(); 
    }

    addTodo(title, description) {
        // console.log(title,description);
        const todo = {
            id: this.currentId++,
            // title: title,
            // description: description,
            title,
            description,
            completed: false,
        }
        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        //retornar un clon.
        // return Object.assign({},todo);
        return {...todo};
    }

    removeTodo(id){
        const index = this.findTodo(id);
        // console.log(this.todos[index]);
        this.todos.splice(index, 1);
        this.save();
    }
}