import React, { useEffect, useState } from 'react'
import {db} from "../Firbase"
import "./Todo.css"
import {
    collection,
    deleteField,
    deleteDoc,
    addDoc,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { async } from '@firebase/util';

const Todo = () => {

    const [inputValue , setinputValue] = useState("")
    const [todo , setTodo] = useState([])
    const [refresh, setRefresh] = useState(false);

useEffect(async () => {
    const dbRef = collection(db, "todos");
    const data = await getDocs(dbRef);
    let getTodo = [];
    data.forEach((doc) => {
      getTodo.push({ key: doc.id, todo: doc.data().todo });
    });
    setTodo(getTodo);
  }, [refresh]);



const addTodo = async (e)=>{
    e.preventDefault()
    const dbRef = collection(db, "todos");

        try {
            const addData = await addDoc(dbRef, {
                todo: inputValue,
            });
            setRefresh(!refresh);
            console.log(addData);
        }
         catch (err) {
                console.log(err)
         }
            setinputValue("");
    

}
const deleteAll = async ()=>{
 
    const dbRef = collection(db, "todos");
    const data = await getDocs(dbRef);
    let getTodo = [];
    data.forEach((doc) => {
      getTodo.push({ key: doc.id, todo: doc.data().todo });
    });

    getTodo.forEach(async(documentsKey)=>{
      const dbRef = doc(db, "todos" ,documentsKey.key);
      await deleteDoc(dbRef)
    })
    alert("Todos has been Deleted Successfully")
    setTodo(getTodo);
    setRefresh(!refresh)

}
 

const deleteTodo = async (key)=>{
 
  const dbRef =  doc(db , "todos", key);
  const deletee = deleteField()
  const obj = {
    todo: deletee
}
try{
  const deleteResponse =await  deleteDoc(dbRef, obj );
  console.log(deleteResponse)
  setRefresh(!refresh);
  // alert("Todo Deleted Sucessfully")
}
catch(err){
  console.log(err)

}

}


const editTodo =async (key) =>{
    const dbRef = doc(db, "todos", key);
    const editValue = prompt("enter value");
    const obj = {
      todo: editValue,
    };
    if(editValue.length <= 0) {
      alert("Enter value please")
    }else{
      try {
        const updateResponse = await updateDoc(dbRef, obj);
        console.log(updateResponse);
        setRefresh(!refresh);
      } catch (error) {
        alert(error);
      }
    }
}

    return (
    <>



<div className="containerfluid body">
<div className="todoMain">
<div className="input-group pt-3 py-3 main">
 <input type="text" 
  className="form-control py-2 col-lg-12 col-md-12 col-sm-12"
   aria-label="Recipient's username with two button addons"
   value={inputValue}
   placeholder='Enter Todo'
   onChange= { e =>{setinputValue(e.target.value)}}/>
  
  <div>
  <button className="btn btn-primary py-2 col-lg-12 col-md-12 col-sm-12" type="button"
  onClick={addTodo} disabled={inputValue.length <= 0}>add</button>
  <button className="btn btn-danger py-2 col-lg-12 col-md-12 col-sm-12"
   type="button" onClick={deleteAll}
   disabled={todo <=0 }
  >delete</button>
  </div>
</div>
</div>

{
          todo.map((todo,ind)=>{
     
            return (<div className="container py-5" key={ind}>
 <div className="row mx-0 todoList">
 <h3 className='py-2 col-lg-12 col-md-12 col-sm-12'>{todo.todo}</h3>
  <button className="py-2 col-lg-12 col-md-12 col-sm-12 btn btn-primary "
   type="button"
    onClick={ ()=> editTodo(todo.key)}
    >edit</button>
  <button className="py-2 col-lg-12 col-md-12 col-sm-12 btn btn-danger" type="button"
  onClick={()=> deleteTodo(todo.key)}>delete</button>
 </div>
</div>)
          })
}

</div> 
    </>
  )
}

export default Todo












