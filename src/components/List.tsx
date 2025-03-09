import Todo from "../types/todo";
import CompleteTodo from "./CompleteTodo"
import status from "../types/status";
import { useState,useRef } from "react";



function List (){

    const List:Todo[]=[]
    const [todos,setTodos]=useState(List);
    const [currentTodo,setCurrentTodo]=useState<Todo|null>(null);
    const [editText,seteditText]=useState("");
    const [isEditting,setIsEditting]=useState(false);
    const editRef=useRef<HTMLInputElement>(null);
    const [Text,setText]=useState("")


    const Addnewtodo=(text:string):void=>{
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

    const Removetodo=(id:number):void=>{
        const Remaining=todos.filter(t=>t.id!==id);
        setTodos([...Remaining])
    }


    const Updatetodos=(id:number,text:string):void=>{

        const updated=todos.map(t=>t.id === id ? {...t,text} : t); 
        setTodos([...updated])
    }


    const Updatetodos_Status=(id:number,S:status):void=>{

        const updated=todos.map(t=>t.id === id ? {...t,status:S} : t); 
        setTodos([...updated])
    }




    const HandleEditSubmit=(event:any)=>{
        event.preventDefault();
        
        if(editRef.current.value===""){
            alert("text cannot be blank for todo item ")
            return
        }  

        Updatetodos(currentTodo.id,editRef.current.value);
        alert("Todo item updated");
        seteditText("");
        setCurrentTodo(null)
        setIsEditting(false);
        
}



    const HandleSubmit=(event:any)=>{
        event.preventDefault();
       Addnewtodo(Text); 
       setText("");

    }


    
    
    
    


    
    const renderedList = todos.map(t=>{

        return <li key={t.id}>
                    

                    <CompleteTodo  todos={todos} Updatetodos_Status={Updatetodos_Status} t={t}/>
                    
                    <div>{t.text} </div>

                    

                    <div className="delete-todo-btn-container">
                        <img className="delete-todo-btn" src="/images/icon-cross.svg" alt="delete item" onClick={()=>Removetodo(t.id)}/>
                    </div>

                        

                   {isEditting===false?
                   <button onClick={
                    ()=>{setIsEditting(true)
                    setCurrentTodo(t)
                    seteditText(t.text)
                   }}>
                        Edit
                    </button>:""}
                    
                           
                </li>
    })

    return(<>
        <div>


            {isEditting===false?
            
            <form onSubmit={HandleSubmit}>

                <h1>Add a Todo</h1>
                <div>
                    
                    <input id="todo" 
                    name="todo" 
                    placeholder="Enter a newTodo item" 
                    onChange={e=>setText(e.target.value)} 
                    type="text"
                    value={Text}
                    />
                       
                </div>

                <button type="submit"> + Add </button>
            </form>: 
            <>
            <h1>Edit Todo</h1>
            <form onSubmit={HandleEditSubmit} id="edit-form">
             <input id="todo" 
                    name="edit" 
                    placeholder="Enter your todo"
                    onChange={e=>seteditText(e.target.value)} 
                    type="text"
                    ref={editRef}
                    value={editText}
                    />
            <button type="submit">ok</button>   

        </form></>}



            {isEditting===false?
            <>
            <ul id="TodoList-section">
                 {todos.length===0?<h1>Its empty in here...Lets get Started</h1>:renderedList}
            </ul>

            <span>{`active items left:${todos.filter(t=>t.status==="active").length}`}</span>
            </>
            :""}

        </div>
    </>)
}


export default List