import { useState,useEffect  } from "react";
import axios from "axios";

const Dashboard = () => {
  const [TotalTask, setTotalTask] = useState(0);
  const [Todo, setTodo] = useState(0);
  const [InProgress, setInProgress] = useState(0);
  const [Completed, setCompleted] = useState(0);

  // Function to get all tasks from the database
  const getTasks = ()=>{
    axios.get('http://localhost:5000/getTask').then((res)=>{
      setTotalTask(res.data.length)
      const todoTasks = res.data.filter(task=> task.status ==="To Do")
      setTodo(todoTasks.length)
      const inProgressTasks = res.data.filter(task=> task.status ==="In Progress")
      setInProgress(inProgressTasks.length)
      const compeletedTasks = res.data.filter(task=> task.status ==="Done")
      setCompleted(compeletedTasks.length)

      
    })
  }

  useEffect(()=>{   
    getTasks()
  }
  ,[])  


    return (
      <>
      <h1 className="flex justify-center text-[20px] font-bold text-blue-400 sm:hidden">Task Manager</h1>
      
      <div className=" grid  sm:grid-cols-[250px_250px_250px_250px]  grid-cols-[130px_130px] gap-2  pt-2">
        <div  className="bg-yellow-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{TotalTask}</h1>
          <h1>Total Task</h1>
        </div>
        <div className="bg-blue-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{Todo}</h1>
          <h1>To Do</h1>
        </div>
        <div className="bg-green-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{InProgress}</h1>
          <h1>On going</h1>
        </div>
        <div className="bg-gray-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{Completed}</h1>
          <h1>Completed</h1>
        </div>
      </div>

     
        




      </>
    );
  };
  
  export default Dashboard;
  