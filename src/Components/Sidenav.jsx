import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Importing icons from react-icons
import { FaTasks, FaClipboardList, FaSpinner, FaCheckCircle, FaPlus } from 'react-icons/fa';


// import completedicon from react icons



const Sidenav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/me', { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    const handleAddTask = () => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            navigate('/addtask'); // Redirect to add task if logged in
        }
    };

    return (
        <div className="bg-blue-400 h-screen sm:w-[18%] w-[27%] fixed">
            <ul className="pl-3">
                <h1 className="text-white text-[15px] sm:text-[22px] font-[poppins] pl-4 pt-3 font-bold">TaskFlow</h1>
                <Link to="/"> <li className="text-white text-[15px] sm:text-[25px] pl-4 py-3 font-[inter]">Dashboard</li></Link>
                <Link to="/task"> <li className="text-white text-[15px] sm:text-[22px] pl-4 py-3 font-[inter]"> <FaTasks className="inline-block mr-2" /> All Tasks</li></Link>
                <Link to="/todo"> <li className="text-white text-[15px] sm:text-[22px] pl-4 py-3 font-[inter]"> <FaClipboardList className="inline-block mr-2" /> To Do</li></Link>
                <Link to="/inprogress"> <li className="text-white text-[15px] sm:text-[22px] pl-4 py-3 font-[inter]"> <FaSpinner className="inline-block mr-2" /> In Progress</li></Link>
                <Link to="/compeleted"> <li className="text-white text-[15px] sm:text-[22px] pl-4 py-3 font-[inter]"> <FaCheckCircle className="inline-block mr-2" /> Completed</li></Link>

                <li onClick={handleAddTask} className="text-white text-[15px] sm:text-[22px] pl-4 py-3 font-[inter] cursor-pointer"> <FaPlus className="inline-block mr-2" /> Add a Task</li>
            </ul>
        </div>
    );
}

export default Sidenav;