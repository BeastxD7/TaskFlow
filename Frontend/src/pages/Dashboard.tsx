import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import UpdateModal from "../components/UpdateModal";

const Dashboard = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [display, setDisplay] = useState(false);
  const [message, setMessages] = useState("");

  const toggleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const fetchTasks = async () => {
    try {
      setMessages("Loading...");
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: { token },
      });

      setTasks(response.data.tasks);
      setMessages("");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    try {
      localStorage.setItem("token", "");
      alert("You have been Logged Out!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <UpdateModal
        display={display}
        toggleDisplay={() => {
          setDisplay(!display);
        }}
        refreshTasks={fetchTasks}
      />
      <div className="min-h-screen bg-white bg-gradient-to-r from-slate-900 to-gray-950 ">
        <nav className="fixed w-full bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to={"/"}>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img src="./logo.svg" alt="logo" className="w-8" />
                    <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white cursor-pointer">
                      TaskFlow
                    </span>
                  </div>
                </div>
              </Link>
              <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                  <Link
                    to={"/"}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2">
                    Home
                  </Link>
                  <button
                    onClick={toggleDisplay}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Tasks
                  </button>

                  {token ? (
                    <button
                      onClick={logOut}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Logout
                    </button>
                  ) : (
                    <Link
                      to={"/signin"}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      SignIn
                    </Link>
                  )}
                </div>
              </div>
              <button
                onClick={toggleDisplay}
                className="bg-blue-600 hover:bg-blue-700 min-md:hidden text-white px-4 py-2 rounded-lg transition-colors">
                Add Tasks
              </button>
            </div>
          </div>
        </nav>

        <div className="text-white text-center flex flex-wrap gap-5 justify-center pt-20 mt">
          {token ? "" : "Login First"}
          {tasks && tasks.length < 1 ? "No contents yet! " : ""}
          <div className="w-full"></div>
          {tasks &&
            tasks.map((task: any) => {
              return (
                <TaskCard
                  refreshTasks={fetchTasks}
                  status={task.completed}
                  id={task.id}
                  key={task.id}
                  title={task.title}
                  description={task.description}
                />
              );
            })}
          <div className="w-[90%] max-h-72 h-fit pb-3 sm:w-80 bg-gray-700 rounded-lg ">
            <div className="flex  justify-between items-center border-b-[1px] border-gray-500 px-5">
              <h1 className="text-start  font-semibold  py-2">
                Don't see your Task?
              </h1>
              <img className="w-6" src="reload.svg" alt="logo" />
            </div>
            <div className="py-3 px-2 text-center mb-3">
              <div className="w-full flex justify-center">
                <img className="w-24 h-24" src="worry.png" alt="logo" />
              </div>
              Try refreshing the database to get all your Latest Tasks!
            </div>

            <div className="flex justify-center px-3">
              <button
                onClick={fetchTasks}
                className={`px-3 text-sm py-2 rounded-md cursor-pointer bg-white text-black `}>
                Refresh Database
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
