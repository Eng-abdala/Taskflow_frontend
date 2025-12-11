import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";
const UpdateTask = () => {
    const param = useParams();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const getToken = () => localStorage.getItem('token');


    const navigate = useNavigate();
    

    const getTask = ()=>{
        axios.get(`http://localhost:5000/getSingleTask/${param.id}`
        , {headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
        ).then((res)=>{
            // console.log(res.data[0])
            setTitle(res.data[0].title),
            setDescription(res.data[0].description)
        }).catch((err)=>{
            console.log(err)
        })  
    }

    useEffect(()=>{
        getTask()


   

    },[])


     // function that reads data using id from the url and sets the data in the input fields
     const Update = (event)=>{
        event.preventDefault();
    axios.put(`http://localhost:5000/updateTask/${param.id}`,{
        "title":title,
        "description":description,
    }).then((res)=>{
        setTitle("");
        setDescription("");     
        toast.success("Task updated successfully")
        setTimeout(() => {
            navigate("/task")
        }, 2000);


    }).catch((err)=>{
        console.log(err);

    })
}


    return (
        <>
        <div className="flex justify-center ">
        <form className="w-[350px] h-[350px] shadow-xl shadow-blue-300 text-center pt-5 mt-[10%]" action="">

        <h1 className="text-[20px] text-blue-500 font-bold py-3">Update the task</h1>

            <input value={title}  onChange={(event)=> setTitle(event.target.value)} className="w-[300px] h-[30px] border-2 border-blue-400 outline-none pl-2 rounded" type="text" placeholder="Enter a task"/> <br />
            <textarea value={description} onChange={(event)=> setDescription(event.target.value)} className="w-[300px] h-[100px] border-2 my-4 border-blue-400 outline-none pl-2 rounded" type="textarea" placeholder="Enter a description"/>  <br/>

            <button onClick={Update} className="bg-blue-500 px-3 py-0.5 text-white text-[18px] rounded mt-3 font-bold">Update</button>
        </form>
        </div>
        
        <Toaster/>
        </>
    )
}


export default UpdateTask;