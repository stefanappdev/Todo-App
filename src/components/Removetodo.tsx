//removes a todo item

import Todo from "../types/todo";

const Removetodo=(id:number,todos:Todo[],setTodos):void=>{
    const Remaining=todos.filter(t=>t.id!==id);
    setTodos([...Remaining])
}

const RemoveAlltodos=(setTodos,todos):void=>{
    if(todos.length===0){
        alert("Todo List already empty")
        return
    
    }
    alert("Todo List cleared")
    setTodos([])
}

const RemoveCompletedtodos=(todos:Todo[],setTodos):void=>{
    
    const Remaining=todos.filter(t=>t.status!=="completed");
    alert("All completed todos removed")
    setTodos([...Remaining])
}



export {Removetodo,RemoveAlltodos, RemoveCompletedtodos}