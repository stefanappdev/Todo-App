import Todo from "../types/todo";

const Addnewtodo=(text:string,setTodos:any,todos:Todo[]):void=>{
    //add new item todo List(todos)

    let existing=todos.find(t=>t.text===text);
    if(existing){
        alert("todo item already exist");
        return
    }

    if(text===""){
        alert("text cannot be blank for todo item ")
        return
    }  
    
    let id=Math.floor(Math.random()*100);

    let newTodo:Todo={id:id,text:text,status:"active"};
    setTodos([...todos,newTodo]);    
}


export {Addnewtodo}