import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const token = localStorage.getItem("token");

const test = () => {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          token,
        },
      });

      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col  justify-center p-4">


      <div className="text-white text-center flex flex-wrap gap-5 justify-center mt-6">
      {tasks.map((task:any , index:number)=> {
          return(
          <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
        />
          )
        })}
      </div>
    </div>
  );
};

export default test;
