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

        return <li className="w-[300px]  " key={t.id}>

                    <div className=" w-[80%] text-white bg-[#25273c] h-[100px] inline-flex items-center justify-evenly pr-[30px]">
                            
                            <CompleteTodo  todos={todos} Updatetodos_Status={Updatetodos_Status} t={t}/>
                            
                            <p className="font-sm  w-[100%] mx-[20px]" >{t.text} </p>

                            

                          

                                

                        {isEditting===false?
                        <button className="mx-[20px]" onClick={
                            ()=>{setIsEditting(true)
                            setCurrentTodo(t)
                            seteditText(t.text)
                        }}>
                                Edit
                            </button>:""}


                            
                        <img className=" w-[20px] h-[20px] mx-[20px]  delete-todo-btn" src="/images/icon-cross.svg" alt="delete item" onClick={()=>Removetodo(t.id)}/>
                            


                    </div>
                           
                </li>
    })

    return(<>
        <div className="  w-96 px-[20px] bg-[url(images/bg-mobile-dark.jpg)]">

            

           
            <h1 className='text-left text-4xl font-bold text-white ' >T O D O</h1>

            {isEditting===false?
            
            <form className="flex flex-col justify-center items-center my-[20px]" onSubmit={HandleSubmit}>

                
                <div id="add-todo-form">
                    
                    <input className="text-white bg-[#25273c] rounded-sm h-[40px] w-[300px] mx-2" id="todo" 
                    name="todo" 
                    placeholder="Create a new todo.." 
                    onChange={e=>setText(e.target.value)} 
                    type="text"
                    value={Text}
                    />
                     
                </div>

                
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
            <ul id="TodoList-section" className="flex text-white bg-[#25273c] my-[20px] flex-col justify-center items-center" >
                 {todos.length===0?<h1>Its empty in here...Lets get Started</h1>:renderedList}
            </ul>
            
            {todos.length>0&&<div>
                <span className="">{`items left:${todos.filter(t=>t.status==="active").length}`}</span>
                <div>
                    <span>All</span>
                    <span>Active</span>
                    <span>Completed</span>
                </div>
            </div>}
            </>
            :""}

        </div>
    </>)
}


export default List