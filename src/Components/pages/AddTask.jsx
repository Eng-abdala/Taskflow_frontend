import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");  
    const navigate = useNavigate();

    const posTask = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); // Get token from local storage

        axios.post("http://localhost:5000/addTask", {
            title,
            description,
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in headers
            }
        }).then(() => {
            toast.success("Task added successfully");
            setTitle("");
            setDescription("");   
            setTimeout(() => {
                navigate("/tasks"); // Redirect to tasks page
            }, 2000);  
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to add task");
        });
    }

    return (
        <div className="flex justify-center ">
            <form className="sm:w-[350px] w-[270px] h-[350px] shadow-xl shadow-blue-300 text-center pt-5 mt-[10%]" onSubmit={posTask}>
                <h1 className="text-[20px] text-blue-500 font-bold py-3">Add a new task</h1>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="sm:w-[300px] w-[250px] h-[30px] border-2 text-[18px] border-blue-400 outline-none pl-2 rounded" type="text" placeholder="Enter a task" required /> <br />
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="sm:w-[300px] w-[250px] h-[100px] border-2 my-4 border-blue-400 outline-none pl-2 rounded" placeholder="Enter a description" required /> <br/>
                <button type="submit" className="bg-blue-500 px-3 py-0.5 text-white text-[18px] rounded mt-3 font-bold">Add</button>
            </form>
            <Toaster />
        </div>
    );
}

export default AddTask;