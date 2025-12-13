import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getToken = () => localStorage.getItem("token");

  const getTask = () => {
    axios
      .get(`http://localhost:5000/getSingleTask/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  const Update = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/updateTask/${id}`, {
        title,
        description,
      })
      .then(() => {
        toast.success("Task updated successfully");

        setTimeout(() => {
          navigate("/task");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex justify-center">
        <form className="w-[350px] h-[350px] shadow-xl shadow-blue-300 text-center pt-5 mt-[10%]">
          <h1 className="text-[20px] text-blue-500 font-bold py-3">Update the task</h1>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[300px] h-[30px] border-2 border-blue-400 outline-none pl-2 rounded"
            type="text"
            placeholder="Enter a task"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[300px] h-[100px] border-2 my-4 border-blue-400 outline-none pl-2 rounded"
            placeholder="Enter a description"
          />

          <button
            onClick={Update}
            className="bg-blue-500 px-3 py-0.5 text-white text-[18px] rounded mt-3 font-bold"
          >
            Update
          </button>
        </form>
      </div>

      <Toaster />
    </>
  );
};

export default UpdateTask;
