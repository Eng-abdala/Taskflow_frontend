import { useState,useEffect } from "react"
import axios from "axios";
const Compeleted = ()=>{
    const [tasks, setTasks] = useState([]);

        const getToken = () => localStorage.getItem('token');
    // function to get compeleted tasks from the database
    const getCompeletedTasks = ()=>{
        axios.get('http://localhost:5000/getTask', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then((res)=>{
            const compeletedTasks = res.data.filter(task=> task.status ==="Done")
            setTasks(compeletedTasks)
        }) 
    }

    

    useEffect(()=>{
        getCompeletedTasks()
    },[])
    // function that handles the delete button click 
    const handleDelete =(id)=>{
        axios.delete(`http://localhost:5000/deleteTask/${id}`).then((res)=>{
            getCompeletedTasks()
        }).catch((err)=>{       
            console.log(err)
        })

    }   
    return(
        <div className=" grid sm:grid-cols-[260px_260px_260px] grid-cols-[260px] gap-5 ">
        {
            tasks.map((task)=>{
                return <div className=" p-2 shadow-blue-300 shadow-2xl rounded-lg relative  mt-2 w-[260px] h-[180px]">
                    <h1 className="text-[20px]  pt-3 font-bold">{task.title}</h1>
                    <p className="text-gray-700"> {task.description}</p>
                    <p className="text-green-400 text-[12px] font-semibold">{task.status}</p>
                    <p className="text-gray-700">{task.createdAt}</p>
                    
                    
                <button onClick={()=>handleDelete(task._id)}  className="bg-red-400 text-white px-3 absolute bottom-2 left-20 rounded">Delete</button>
                </div>
            })
        }
        </div>


    )
}

export default Compeleted