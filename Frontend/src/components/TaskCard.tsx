import axios from "axios";

interface propsType {
    title:string;
    description:string;
    id:number
    status:boolean
}

const token = localStorage.getItem("token")

const completeTask = async (id:number) => {
  let response;
  try {
    response = await axios.patch(
      `http://localhost:3000/api/tasks/${id}`,
      {
        completed:true
      },
      {
        headers: {
          token: token ? `${token}` : "",
        },
      }
    );  
    alert(response.data.message);
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

const deleteTask = async (id:number) => {
  let response;

  try {
    response = await axios.delete(
      `http://localhost:3000/api/tasks/${id}`,
      // {
      //   title: titleRef.current?.value,
      //   description: descRef.current?.value,
      // },
      {
        headers: {
          token: token ? `${token}` : "",
        },
      }
    );  
    alert(response.data.message);
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

const TaskCard = (props:propsType) => {
  return (
    <div className='w-[90%] max-h-72 h-fit pb-3 sm:w-80 bg-gray-700 rounded-lg '>
        <div className="flex  justify-between items-center border-b-[1px] border-gray-500 px-5">
        <h1 className='text-start  font-semibold  py-2'>{props.title}</h1>
            <img className="w-6" src={`${props.status ? "./tick.svg": "./process.svg"}`} alt="logo"  />
        </div>
        <p className='py-3 px-2 text-center mb-3'>{props.description}</p>

        <div className="flex justify-between px-3">
        <button onClick={()=>{props.status ? null : completeTask(props.id) }} className={`${props.status ? "bg-green-600" : "bg-yellow-600"} py-2 text-sm cursor-pointer px-2 rounded-md`}>{props.status ? "Completed" : "Mark Complete"}</button>
        <img onClick={()=>{deleteTask(props.id);}} className="w-6 cursor-pointer " src="./delete.svg" alt="logo"  />

        </div>
    </div>
    
  )
}

export default TaskCard