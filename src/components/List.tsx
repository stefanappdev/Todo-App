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

    const Removetodo=(id:number):void=>{
        const Remaining=todos.filter(t=>t.id!==id);
        setTodos([...Remaining])
    }


    const Updatetodos=(id:number,text:string):void=>{

        const updated=todos.map(t=>t.id === id ? {...t,text} : t); 
        setTodos([...updated])
    }

    const UpdateActiveView=(id:number,isActive:boolean):void=>{
      const updated=Views.map(v=>v.id===id? {...v,isActive:true}:{...v,isActive:false})
      setViews([...updated])
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


    
    
    const alltodos=todos;
    const activetodos=todos.filter(t=>t.status==="active");
    const completetodos=todos.filter(t=>t.status==="completed");



    const renderedviews=Views.map(view=>{

    
        return <div key={view.id}>
            
           <span className={view.isActive?"text-blue-500 font-bold":""}

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
    

    let listToRender:Todo[]=[];
    if(showAlltodos){
        listToRender=alltodos;
    }else if(showActivetodos){
        listToRender=activetodos;
    }else if (showCompletedtodos){
        listToRender=completetodos;
    }
    
    const renderedList = listToRender.map(t=>{

        return <li className={
            TC.isDark?
            "w-[100%] h-[85px] border-b-[1px]  border-white  bg-[#25273c]  inline-flex items-center justify-evenly pr-[30px]":
            " w-[100%] h-[85px] border-b-[1px]  border-white  bg-white  inline-flex items-center justify-evenly pr-[30px]"}
        key={t.id}>

                    
                            
                    <CompleteTodo  todos={todos} Updatetodos_Status={Updatetodos_Status} t={t}/>
                            
                     {t.status==="active"?<span className={TC.isDark?"w-[100%] text-white ":"w-[100%] text-black "}> {t.text} </span>:
                     <span className={TC.isDark?"w-[100%] text-white line-through ":"w-[100%] text-black line-through"}> {t.text} </span>
                     
                     }
                                
                     <div className="">           
                        {isEditting===false?

                        <button className="mx-[20px]" onClick={
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
        <div className={TC.isDark? "w-96 px-[20px] h-screen text-white bg-[url(images/bg-mobile-dark.jpg)]  " : "w-96 px-[20px] text-black h-screen  bg-[url(images/bg-mobile-light.jpg)]"}>

       

           <div className="flex items-center justify-between"> 
            <h1 className='text-left text-4xl font-bold text-white ' >T O D O</h1>
            <img className=" w-[20px] h-[20px] mx-[20px] " src={TC.isDark?"/images/icon-sun.svg":"/images/icon-moon.svg"} alt="toggle theme" onClick={TC.toggleTheme}/>
           
           </div>
           

            {isEditting===false?
            
            <form className=">flex flex-col justify-center items-center my-[20px]" onSubmit={HandleSubmit}>

                
                <div id="add-todo-form">
                    
                    <input className={TC.isDark?"text-white bg-[#25273c] rounded-sm h-[40px] w-[300px] mx-2":
                                    "text-black bg-white rounded-sm h-[40px] w-[300px] mx-2"} 
                                    
                    id="todo" 
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
                <span className="">{`active items left:${todos.filter(t=>t.status==="active").length}`}</span>

                <br/>

                <div id="views" className={TC.isDark?
                    "inline-flex h-[40px] justify-evenly gap-[10px] rounded-sm px-[5px] items-center my-[20px] w-[100%] text-white bg-[#25273c]":
                    "inline-flex h-[40px] justify-evenly gap-[10px] rounded-sm px-[5px] items-center my-[20px] w-[100%] text-black bg-white "}>
                     
                     
                     
                     {renderedviews}

                </div>


                   

            </div>}
            </>
            :""}


        

        </div>
    </>)
}


export default List