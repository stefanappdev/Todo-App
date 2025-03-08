import Todo from "../types/todo";
import CompleteTodo from "./CompleteTodo"
import { useState } from "react";

function List (){

    const List:Todo[]=[]
    const [todos,setTodos]=useState(List);

    const [Text,setText]=useState("")


    const Addnewtodo=(text:string):void=>{
        //add new item todo List(todos)

        let id=Math.floor(Math.random()*100);

        let existingitm=todos.find(t=>t.id===id);
        let existingtext=todos.find(t=>t.text===text)
        if(text===""){
            alert("Please enter text for todo item ")
            return
        }else if(existingitm){
            alert("this todo item exists already")
            return
        }else if(existingtext){
            alert("A todo item with this text exists already")
            return
        }

        let newTodo:Todo={id:id,text:text,status:"active"};
        setTodos([...todos,newTodo]);    
    }

    const Removetodo=(todo:Todo):void=>{
        const Remaining=todos.filter(t=>t.id!==todo.id);
        setTodos([...Remaining])
    }


    const Updatetodos=(todo:Todo,text:string):void=>{
        const updated=todos.map(t=>{
            
            if(t.id===todo.id){
                t.text=todo.text;
                return t
            }else{
                return t
            }})
        
    }



    const HandleSubmit=(event:any)=>{
        event.preventDefault();
        Addnewtodo(Text);
        event.target.todo.value=""
        

    }

    
    const renderedList = todos.map(t=>{

        return <li key={t.id}>
                    

                    <CompleteTodo  t ={t}/>
                    
                    <div>{t.text} </div>

                    

                    <div className="delete-todo-btn-container">
                        <img className="delete-todo-btn" src="/images/icon-cross.svg" alt="delete item" onClick={()=>Removetodo(t)}/>
                    </div>
                           
                </li>
    })

    return(<>
        <div>


            <form onSubmit={HandleSubmit}>
                <div>
                    
                    <input id="todo" name="todo" placeholder="Enter a newTodo item" onChange={e=>setText(e.target.value)} type="text"/>
                       
                </div>

                <button type="submit"> + Add </button>
            </form>



            <ul id="TodoList-section">
                 {renderedList}
            </ul>

            <span>{`${todos.filter(t=>t.status==="active").length} items left`}</span>
        </div>
    </>)
}


export default List