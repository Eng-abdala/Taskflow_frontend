import {useState, useEffect } from 'react';
import axios from 'axios';

const InProgress = () => {
    const [tasks, setTasks] = useState([]);

    // function to get in-progress tasks from the database

    const getInProgressTasks = () => {
        axios.get('http://localhost:5000/getTask').then((res)=>{
            const InProgressTasks = res.data.filter(task=> task.status ==="In Progress")
            setTasks(InProgressTasks)
        })
    }

   


    useEffect(() => {
        getInProgressTasks();
    }, []);

    // function that handles the compelete button click
    const handleCompelete =(id)=>{
        axios.put(`http://localhost:5000/updateStatus/${id}`,{
            status:"Done"
        }).then((res)=>{
            getInProgressTasks()
        }).catch((err)=>{       
            console.log(err)
        }   )
    }

    return(
        <div className=" grid sm:grid-cols-[260px_260px_260px] grid-cols-[260px] gap-5 ">
        
{
    tasks.map((task) => {
        return (
            <div className="p-2 shadow-blue-300 shadow-2xl rounded-lg mt-2 relative w-[260px] h-[180px]">
                <h1 className="text-[20px] pt-3 font-bold">{task.title}</h1>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-green-400 text-[12px] font-semibold">{task.status}</p>
                <p className="text-gray-700">{task.createdAt}</p>
                <button onClick={()=>handleCompelete(task._id)}  className="bg-blue-400 text-white px-3 absolute bottom-2 left-20 rounded">Compelete</button>

            </div>

        );
    })
}
        
        </div>
    )
}


export default InProgress;