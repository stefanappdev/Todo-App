import { useState } from "react"
import Todo from "../types/todo";



function CompleteTodo({t}){
 const[Todo,setTodo]=useState(t);
 const [status,setStatus]=useState();

 const handleStatus=(todo:Todo)=>{
   if (todo.status==="active"){
        setTodo({...Todo,status:"completed"})
        setStatus(Todo.status)
   }else{
    setTodo({...Todo,status:"active"})
    setStatus(Todo.status)
   } 
 }

 return(
 <div>
   
      <div className="h-7 w-7 bg-sky-400 border-2 border-solid border-white rounded-full" onClick={()=>handleStatus(Todo)}>
            {status==="completed"&&<img className="h-7 w-7" src="/images/icon-check.svg"/>}
      </div>



 </div>)

}


export default CompleteTodo