import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidenav from "./Components/Sidenav";
import Dashboard from "./Components/pages/Dashboard";
import Tasks from "./Components/pages/Tasks";
import AddTask from "./Components/pages/AddTask";
import UpdateTask from "./Components/pages/Update";
import InProgress from "./Components/pages/InProgress";
import Todo from "./Components/pages/Todo";
import Compeleted from "./Components/pages/Compeleted";
function App() {
  return (
    <div>
        <Sidenav /> {/* Sidebar always visible */}
        <div className=" sm:ml-[20%] ml-[30%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task" element={<Tasks />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/updatetask/:id" element={<UpdateTask />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/compeleted" element={<Compeleted />} />
          </Routes>
        </div>
        </div>
  );
}

export default App;
