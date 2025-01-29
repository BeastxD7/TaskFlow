
interface propsType {
    title:string;
    description:string;
}

const TaskCard = (props:propsType) => {
  return (
    <div className='w-[90%] max-h-72 h-fit py-3  sm:w-80 bg-gray-700 rounded-lg '>
        <div className="flex  justify-between border-b-[1px] border-gray-500 px-5">
        <h1 className='text-start  font-semibold  py-2'>{props.title}</h1>
            <img className="w-6" src="./logo.svg" alt="logo"  />
        </div>
        <p className='py-3 px-2 text-center'>{props.description}</p>

        <div className="flex justify-end px-3">
        <button className="bg-green-500 py-2 cursor-pointer px-2 rounded-md font-semibold">Completed</button>
        </div>
    </div>
    
  )
}

export default TaskCard