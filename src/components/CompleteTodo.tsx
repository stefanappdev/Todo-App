
import { useState } from "react";
import TICK from "../images/icon-check.svg"
import "../styles/App.css"


///marks a todo as completed

function CompleteTodo({todos,Updatetodos_Status,t}){
 
const [isCompleted,setisCompleted]=useState(false);


 const toggleStatus=(id:number)=>{

          let target=todos.find(t => t.id===id);

          if (!target){
            return;
          }

          if(target.status==="completed"){
             Updatetodos_Status(target.id,"active")
             setisCompleted(false)
          }else{
               Updatetodos_Status(target.id,"completed") 
               setisCompleted(true) 
          }
          
     
     
 }

 return(
 <div>
   
      {t.status==="completed"?
     <div className=" mx-[20px] h-7 w-7 bg-[#83a8ff] border-2 border-solid border-white rounded-full" onClick={()=>toggleStatus(t.id)}>
               <img className="h-7 w-7" src={TICK}/>
     </div>
          :
      <div className=" mx-[20px] h-7 w-7 bg-[#83a8ff] border-2 border-solid border-white rounded-full" onClick={()=>toggleStatus(t.id)}>
         
      </div>

    
     }



 </div>)

}


export default CompleteTodo;