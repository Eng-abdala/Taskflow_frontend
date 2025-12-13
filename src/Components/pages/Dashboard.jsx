import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchTasks = async () => {
    const token = getToken();

    try {
      const res = await axios.get("http://localhost:5000/getTask", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "To Do").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Done" || t.status === "Completed").length;

  const data = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [todo, inProgress, completed],
        backgroundColor: ["#4fd1c5", "#36a2eb", "#ff6384"],
        borderColor: ["#38b2ac", "#2b9bd6", "#e53e4f"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    cutout: "60%",
  };

  return (
    <>
      <h1 className="flex justify-center text-[20px] font-bold text-blue-400 sm:hidden">Task Manager</h1>

      <div className="grid sm:grid-cols-[250px_250px_250px_250px] grid-cols-[130px_130px] gap-2 pt-2">
        <div className="bg-yellow-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{loading ? 0 : total}</h1>
          <h1>Total Task</h1>
        </div>
        <div className="bg-blue-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{loading ? 0 : todo}</h1>
          <h1>To Do</h1>
        </div>
        <div className="bg-green-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{loading ? 0 : inProgress}</h1>
          <h1>On going</h1>
        </div>
        <div className="bg-gray-300 text-center p-3 sm:w-[200px] w-[130px] h-[150px] rounded">
          <h1 className="text-[25px] pl-3 pt-3 font-bold">{loading ? 0 : completed}</h1>
          <h1>Completed</h1>
        </div>
      </div>

      <div className="pt-5 h-[360px] w-full max-w-[480px] mt-10 mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
};

export default Dashboard;