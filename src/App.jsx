import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [flagAdd, setflagAdd] = useState(true); 
  const [checkFinished, setCheckFinished] = useState(false);

  useEffect(()=> {
    if(localStorage.getItem("todos")){
    let todos = JSON.parse(localStorage.getItem("todos"));

    setTodos(todos);
  }
  },[]);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleFinished = () => {
    setCheckFinished(!checkFinished);
  }

  const handleAdd = () => {
    if(todo.length > 0){
    const id = uuidv4();
    //using spread operator and appending an object with task and status
    setTodos([...todos, { todo, id: id, isCompleted: false }]);
    //again setting it to empty string
    setTodo("");

    saveToLocalStorage();
  }
  };

  const handleUpdate = (e, todo, id) => {
    if (todo.length > 0) {
    setTodo(todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos);
    setflagAdd(false);

    saveToLocalStorage();
  }
  };

  const handleDelete = (e,id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id );
    setTodos(updatedTodos);

    saveToLocalStorage();
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]; //using spread operator so newTodos will have a new reference and both variable won't refer to same array
    // toggle isCompleted (true:false)
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />
      <div className="p-4 bg-blue-300 container min-h-screen">
        <div className="flex justify-center m-3 p-3">
          <h1 className="text-xl font-bold text-white">Add your tasks ✅</h1>
        </div>
        <div>
          <input
            className="p-2 mx-3 rounded-md text-slate-800 font-medium"
            onChange={handleChange}
            value={todo}
            type="text"
          />
          <button
            className="p-2 mx-3 bg-blue-600 text-white rounded-md"
            onClick={handleAdd}
            disabled = {todo.length < 3}
          >
            {flagAdd ? "Add+" : "Update"}
          </button>
        </div>
        <div className="p-2 m-2 flex gap-2">
        <input type="checkbox" checked={checkFinished} onChange={handleFinished} name="" id="" />
        <h2>show finished</h2>
        </div>

        {/* In case of empty todos */}
        {todos.length === 0 && <div className="flex justify-center font-medium text-red-800"> <h1>No todos to show!</h1></div>}
        
        {/* In case of non-empty todos */}
        {todos.map((item) => {
          return (
            (checkFinished || !item.isCompleted) &&
            <>
              <div key={item.id} className="p-2 flex flex-row gap-2 w-1/2 justify-between">
               <input type="checkbox" checked={item.isCompleted} onChange={handleCheck} name={item.id} id="" />
               <div className="w-28 content-center">
               <h3 className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </h3>
               </div>
                <div className="flex gap-4">
                <button
                  className="p-2 px-3 mx-3 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {handleUpdate(e, item.todo, item.id)}}
                >
                  Edit
                </button>
                {/* in handleDelete we've created a callback fn so we can pass id in it and it will be triggered only upon click of button */}
                <button
                  className="p-2 px-3 mx-3 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {handleDelete(e,item.id)}} 
                >
                  Delete
                </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;

// **Aleternate Approaches

// const [updateId, setUpdateId] = useState(0);
// const handleAdd = () => {
//   if (!flagAdd) {
//     let updatedTodos = [...todos];
//     updatedTodos.map((item) => {
//       if(item.id === updateId){
//         item.todo = todo;
//       }
      
//     })
//     setTodos(updatedTodos);
//     setTodo("");
//     setflagAdd(true);
//   }
//   else{
//   const id = uuidv4();
//   //using spread operator and appending an object with task and status
//   setTodos([...todos, { todo, id: id, isCompleted: false }]);
//   //again setting it to empty string
//   setTodo("");
// }
// };


// const handleCheck = (e) => {
//   const id = e.target.name;
//   let index = todos.findIndex(item => {
//     return item.id === id;
//   })

//   let newTodos = [...todos]; //using spread operator so newTodos will have a new reference and both variable won't refer to same array
  
//   // toggle isCompleted (true:false)
//   newTodos[index].isCompleted = !newTodos[index].isCompleted;
//   // console.log(newTodos);
//   setTodos(newTodos);

//   // another way*
//   // newTodos.forEach((todo) => {
//   //   if(todo.id === id)  todo.isCompleted === true ? todo.isCompleted = false : todo.isCompleted = true 
//   // })
// }