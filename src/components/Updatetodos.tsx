import Todo from "../types/todo"


//updates a todo item with a new text
const Updatetodos=(id:number,text:string,todos:Todo[],setTodos:any):void=>{

    const updated=todos.map(t=>t.id === id ? {...t,text} : t); 
    setTodos([...updated])
}

export {Updatetodos}