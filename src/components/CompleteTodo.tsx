import { useState } from "react"



function CompleteTodo({todos,Updatetodos_Status,t}){
 

const [isCompleted,setisCompleted]=useState(false);

 const toggleStatus=(id:number)=>{

          let target=todos.find(t=>t.id===id);

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
   
      <div className="h-7 w-7 bg-sky-400 border-2 border-solid border-white rounded-full" onClick={()=>toggleStatus(t.id)}>
            {isCompleted&&<img className="h-7 w-7" src="/images/icon-check.svg"/>}
      </div>



 </div>)

}


export default CompleteTodo;