import { useState, useEffect } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    // Function to get all tasks from the database for the logged-in user
    const getTasks = () => {
        const token = localStorage.getItem('token'); // Get token from local storage

        axios.get("http://localhost:5000/getTask", {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers
            }
        }).then((res) => {
            setTasks(res.data);
        }).catch((err) => {
            console.log(err);
        });  
    }

    // Function to delete a task from the database
    const deleteTask = (id) => {
        const token = localStorage.getItem('token'); // Get token from local storage

        axios.delete(`http://localhost:5000/deleteTask/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers
            }
        }).then(() => {
            getTasks();
        }).catch((err) => {       
            console.log(err);
        }); 
    }

    useEffect(() => {
        getTasks();
    }, []); 

    return (
        <div className="grid sm:grid-cols-[260px_260px_260px] grid-cols-[260] gap-5 ">
            {tasks.map((task) => {
                return (
                    <div key={task._id} className="p-2 shadow-blue-300 shadow-2xl rounded-lg relative mt-2 w-[260px] h-[180px]">
                        <h1 className="text-[20px] pt-3 font-bold">{task.title}</h1>
                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-green-400 text-[12px] font-semibold">{task.status}</p>
                        <p className="text-gray-700">{new Date(task.createdAt).toLocaleString()}</p>
                        <div className="flex justify-center gap-5 items-center my-2 absolute bottom-2 left-25">
                            <i onClick={() => deleteTask(task._id)} className="fa-solid fa-trash text-[20px] text-red-500"></i>
                            <Link to={'/updatetask/' + task._id}><i className="fa-solid fa-pencil text-[20px] text-blue-500"></i></Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Tasks;