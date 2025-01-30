import axios from "axios"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TaskCard from "../components/TaskCard"
import UpdateModal from "../components/UpdateModal"

const Dashboard = () => {

const token = localStorage.getItem("token")
const [tasks ,setTasks] = useState([])
const [display,setDisplay] = useState(false)

const toggleDisplay = () => {
  setDisplay((prev) => !prev)
}

const fetchTasks = async() => {
  try {  

    const response =  await axios.get("http://localhost:3000/api/tasks",{
      headers:{
        token
      }
    })

    setTasks(response.data.tasks);

    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
}

  useEffect( ()=> {
    fetchTasks()
  },[])

  return (<>
  <UpdateModal display={display} toggleDisplay={()=>{setDisplay(!display)}}/>
  <div className="min-h-screen bg-white dark:bg-gray-900 "> 
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-500" />
              <Link to={"/"} className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                TaskFlow
              </Link >
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  to={"/"}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2">
                  Home
                </Link>
                <button
                  onClick={fetchTasks}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 px-3 py-2">
                  Refresh Tasks
                </button>
                <button
                  onClick={toggleDisplay}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Add Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
    </nav>
    <div className="text-white text-center flex flex-wrap gap-5 justify-center pt-28 mt">
      {tasks.length == 0 && "Loading..." }
      {tasks.map((task:any)=> {
          return(
          <TaskCard
          status={task.completed}
          id={task.id}
          key={task.id}
          title={task.title}
          description={task.description}
        />
          )
        })}
      </div>
    
    </div></>

  )
}

export default Dashboard