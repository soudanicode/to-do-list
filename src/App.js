import "./App.css";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
// _____ FILES IMPORTS
import Layout from "./components/layouts";
// _____ copmonents
import HomeInterface from "./components/homeComponent";
import FormInput from "./components/TodoForm";
import CompleteTask from "./components/completedTask";
import Tasks from "./components/task";
import PendingTask from "./components/pendingTask";
import EditTask from "./components/editTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomeInterface />}>
              <Route index element={<Tasks />} />
              <Route path="/completed" element={<CompleteTask />} />
              <Route path="/pending" element={<PendingTask />} />
            </Route>
            <Route path="/addtask" element={<FormInput />} />
            <Route path="/addtask/:title" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
