import { Link } from "react-router-dom";
const Sidenav = () => {
  return <>
    <div className="bg-blue-400 h-screen sm:w-[18%] w-[27%]  sm:flex   fixed">
    <ul className="">
        <h1 className="text-white text-[12px]sm:text-[18px] pl-4 pt-3 font-bold ">TaskFlow</h1>
      <Link to="/" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">Dashboard</li></Link> 
      <Link to="/task" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">All Tasks</li></Link> 
      <Link to="/todo" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">To Do</li></Link> 
      <Link to="/inprogress" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">In progress</li></Link> 
      <Link to="/compeleted" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">Compeleted</li></Link> 
      <Link to="/addtask" > <li className="text-white text-[12px]sm:text-[18px] pl-4 py-3 ">Add a task</li></Link> 
    </ul>
    </div>

    </>
}
export default Sidenav;