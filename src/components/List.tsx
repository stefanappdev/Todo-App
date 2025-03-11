import Todo from "../types/todo";
import CompleteTodo from "./CompleteTodo"
import status from "../types/status";
import { useState,useRef,useContext } from "react";
import { ThemeContext } from "./contexts/Theme";



function List (){
    const TC=useContext(ThemeContext);
    const List:Todo[]=[]
    const [todos,setTodos]=useState(List);
    const [currentTodo,setCurrentTodo]=useState<Todo|null>(null);
    const [showAlltodos,setshowAlltodos]=useState(false);
    const [showActivetodos,setshowActivetodos]=useState(false);
    const [showCompletedtodos,setshowCompletedtodos]=useState(false);
    const [Views,setViews]=
    useState(
        [{id:1,name:"All",isActive:false},{id:2,name:"Active",isActive:false},
        {id:3,name:"Completed",isActive:false}]
    );

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

    //removes a todo item

    const Removetodo=(id:number):void=>{
        const Remaining=todos.filter(t=>t.id!==id);
        setTodos([...Remaining])
    }


    

//updates a todo item with a new text
    const Updatetodos=(id:number,text:string):void=>{

        const updated=todos.map(t=>t.id === id ? {...t,text} : t); 
        setTodos([...updated])
    }


    //updates the active view of todo list
    const UpdateActiveView=(id:number,isActive:boolean):void=>{
      const updated=Views.map(v=>v.id===id? {...v,isActive:true}:{...v,isActive:false})
      setViews([...updated])
    }

   /// updates the status of todo item
    const Updatetodos_Status=(id:number,S:status):void=>{

        const updated=todos.map(t=>t.id === id ? {...t,status:S} : t); 
        setTodos([...updated])
    }



    //submits an edited todo item
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


//submits a new todo item
    const HandleSubmit=(event:any)=>{
        event.preventDefault();
       Addnewtodo(Text); 
       setText("");

    }


    //lists of the different views of the todo list
    
    let alltodos=todos;
    let activetodos=todos.filter(t=>t.status==="active");
    let completetodos=todos.filter(t=>t.status==="completed");
    


//shows all views of todo list
    const renderedviews=Views.map(view=>{

    
        return <div key={view.id}>
            
           <span className={view.isActive?"text-blue-700 font-bold":""}

            onClick={()=>{
                if(view.name==="Completed"){
                    setshowActivetodos(false)
                    setshowAlltodos(false);
                    setshowCompletedtodos(prev=>!prev);
                    UpdateActiveView(view.id,true)
                }else if(view.name==="Active"){
                    setshowActivetodos(prev=>!prev)
                    setshowAlltodos(false);
                    setshowCompletedtodos(false);
                    UpdateActiveView(view.id,true)
                }else{
                    setshowAlltodos(prev=>!prev);
                    setshowActivetodos(false);
                    setshowCompletedtodos(false);
                    UpdateActiveView(view.id,true)
                }
            }
           
        }>
            
            {view.name}
            
            </span>
        </div>
    })
    
    
//shows diiferent lists for each associated view
    let listToRender:Todo[]=[];
    if(showAlltodos){
        listToRender=alltodos;
    }else if(showActivetodos){
        listToRender=activetodos;
    }else if (showCompletedtodos){
        listToRender=completetodos;
    }else{
        listToRender=todos;
    }
    

    
    const renderedList = listToRender.map(t=>{

        return <li className={
            TC.isDark?
            "w-[100%] h-[50px] border-b-[1px]  border-white  bg-[#25273c]  inline-flex items-center justify-evenly pr-[30px]":
            " w-[100%] h-[50px] border-b-[1px]  border-white shadow-gray-500 shadow-lg bg-white inline-flex items-center justify-evenly pr-[30px]"}
        key={t.id}>

              
                    
                    <CompleteTodo  todos={todos} Updatetodos_Status={Updatetodos_Status} t={t}/>
                            
                     {t.status==="active"?<span className={TC.isDark?"w-[100%] font-[14px] text-white ":"w-[100%] font-[14px]  text-black "}> {t.text} </span>:
                     <span className={TC.isDark?"w-[100%] text-white font-bold  line-through ":"w-[100%] font-[14px]  text-black line-through"}> {t.text} </span>
                     
                     }
                                
                     <div className="">           
                        {isEditting===false?

                        <button className={TC.isDark?" text-white  font-bold mx-[20px]":" text-blue-500 mx-[20px] font-bold"} onClick={
                            ()=>{setIsEditting(true)
                            setCurrentTodo(t)
                            seteditText(t.text)
                        }}>
                                Edit
                            </button>:""}
                     </div>

                    <img className=" w-[20px] h-[20px] mx-[20px]  delete-todo-btn" src="/images/icon-cross.svg" alt="delete item" onClick={()=>Removetodo(t.id)}/>
                            
                   
                           
                </li>
    })

    return(<>
        <div className={TC.isDark? 
            "w-96 px-[20px] h-[200px] text-white bg-cover  bg-no-repeat bg-[url(images/bg-mobile-dark.jpg)]  " :
             "w-96 px-[20px] h-[200px] text-black bg-cover bg-no-repeat bg-[url(images/bg-mobile-light.jpg)]"
             
             
             }>

       

           <div className="flex items-center justify-between"> 
            <h1 className='text-left text-4xl font-bold text-white ' >T O D O</h1>
            <img className=" w-[20px] h-[20px] mx-[25px] " src={TC.isDark?"/images/icon-sun.svg":"/images/icon-moon.svg"} alt="toggle theme" onClick={TC.toggleTheme}/>
           
           </div>
           

            {isEditting===false?


            //add todo form displays when editing mode is off
            
            <form id="add-todo-form" className="flex flex-col justify-center items-center my-[20px]" onSubmit={HandleSubmit}>

                
                <div >
                    
                    <input className={TC.isDark?"text-white bg-[#25273c] rounded-sm h-[40px] w-[200px] mx-2":
                                    "text-black bg-white rounded-sm h-[40px] w-[200px] mx-2"} 
                                    
                    id="todo" 
                    name="todo" 
                    placeholder="Create a new todo.." 
                    onChange={e=>setText(e.target.value)} 
                    type="text"
                    value={Text}
                    />

                    <button className="text-white bg-blue-700 font-bold rounded-sm h-[40px] w-[85px] mx-2">
                         Add
                    </button>
                </div>

                 
                     
            </form>: 



            //below is  edit todo form which displays when editing mode is on
            //and also the display section of the Todolist which shows the list of todos for the active view 

            <>
            <h1 className="text-xl text-center font-bold my-[20px]">Edit Todo</h1>
            <form onSubmit={HandleEditSubmit} id="edit-todo-form">
             <input className={TC.isDark?"text-white bg-[#25273c] rounded-sm h-[40px] w-[200px] mx-2":
                                    "text-black bg-white rounded-sm h-[40px] w-[200px] mx-2"} 
                    id="todo" 
                    name="edit" 
                    placeholder="Enter your todo"
                    onChange={e=>seteditText(e.target.value)} 
                    type="text"
                    ref={editRef}
                    value={editText}
                    />
            <button className="text-white bg-blue-700 font-bold rounded-sm h-[40px] w-[85px] mx-2" type="submit">ok</button>   

        </form></>}

        </div>

        <div className={TC.isDark?"bg-[rgba(22,22,32,255)] w-96 h-screen":"w-96 h-screen bg-[rgba(250,250,250,255)]"}>
        

            {isEditting===false?
            <div className="absolute" id="display-section">
            
          

            <ul id="TodoList" className={TC.isDark?
            "flex text-white bg-none  my-[20px] mx-[20px] flex-col justify-center items-center"
            :"flex text-black bg-none shadow-[#f5f5f7] shadow-lg  my-[20px] mx-[20px] flex-col justify-center items-center"
            
            } >
                 {renderedList.length===0?<h1 className="text-xl rounded-none">Its empty in here....</h1>:renderedList}
            </ul>
            
            {<div>
               
                

                <div id="views" className={TC.isDark?
                    "inline-flex h-[40px] justify-evenly gap-[10px] rounded-sm px-[5px] items-center my-[20px] mx-[10px]  w-[100%] text-white bg-[#25273c]":
                    "inline-flex h-[40px] justify-evenly gap-[10px] rounded-sm px-[5px] items-center my-[20px] mx-[10px] shadow-gray-500 shadow-lg  w-[100%] text-black bg-white "}>
                     
                     <span className="">{`items left:${todos.filter(t=>t.status==="active").length}`}</span>

                     
                     {renderedviews}
                   


                </div>


                   

            </div>}
            </div>
            :""}


        

        </div>
    </>)
}


export default List