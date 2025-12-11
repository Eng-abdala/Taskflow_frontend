import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidenav from "./Components/Sidenav";
import Dashboard from "./Components/pages/Dashboard";
import Tasks from "./Components/pages/Tasks";
import AddTask from "./Components/pages/AddTask";
import UpdateTask from "./Components/pages/Update";
import InProgress from "./Components/pages/InProgress";
import Todo from "./Components/pages/Todo";
import Compeleted from "./Components/pages/Compeleted";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/login";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const hideSidenav = location.pathname === "/register" || location.pathname === "/login";
  
  return (
    

    <div >

    {
      /* Sidebar visible only on certain routes */
      !hideSidenav && (
        <div className="hidden sm:block w-[20%]">
          <Sidenav />
        </div>
      ) 
    }

        
        <div className= {hideSidenav ? "" : " sm:ml-[20%] ml-[30%]"}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task" element={<Tasks />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/updatetask/:id" element={<UpdateTask />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/compeleted" element={<Compeleted />} /> 
            <Route path="/register" element={< Register />} /> 
            <Route path="/login" element={< Login />} /> 
          </Routes>
        </div>
        </div>
  ); 
}

export default App;
