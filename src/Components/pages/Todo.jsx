import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Todo = () => {
    const [task, setTask] = useState([]);

    // Function to get todo tasks from the database for the logged-in user
    const getTodoTasks = () => {
        const token = localStorage.getItem('token'); // Get token from local storage

        axios.get('http://localhost:5000/getTask', {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers
            }
        }).then((res) => {
            const todoTasks = res.data.filter(task => task.status === "To Do");
            setTask(todoTasks);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getTodoTasks();
    }, []);

    // Function that handles the start button click 
    const handleStart = (id) => {
        const token = localStorage.getItem('token'); // Get token from local storage

        axios.put('http://localhost:5000/updateStatus/' + id, {
            status: "In Progress"
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers
            }
        }).then(() => {
            getTodoTasks();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="grid sm:grid-cols-[260px_260px_260px] grid-cols-[260px] gap-5 ">
            {task.map((task) => {
                return (
                    <div key={task._id} className="p-2 shadow-blue-300 shadow-2xl rounded-lg mt-2 relative w-[260px] h-[180px]">
                        <h1 className="text-[20px] pt-3 font-bold">{task.title}</h1>
                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-green-400 text-[12px] font-semibold">{task.status}</p>
                        <p className="text-gray-700">{new Date(task.createdAt).toLocaleString()}</p>
                        <Link to={'/updatetask/' + task._id}>
                            <i className="fa-solid fa-pencil text-[20px] absolute bottom-2 left-15 text-blue-500"></i>
                        </Link>
                        <button onClick={() => handleStart(task._id)} className="bg-blue-400 text-white px-3 absolute bottom-2 left-25 rounded">Start</button>
                    </div>
                );
            })}
        </div>
    );
}

export default Todo;