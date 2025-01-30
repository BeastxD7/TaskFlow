import { useRef, useState } from "react";
import axios from "axios";

interface UpdateModalProps {
  display: boolean;
  toggleDisplay: () => void;
}

const UpdateModal = ({ display, toggleDisplay }: UpdateModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const addTask = async () => {
    let response;
    try {
      response = await axios.post(
        "http://localhost:3000/api/tasks",
        {
          title: titleRef.current?.value,
          description: descRef.current?.value,
        },
        {
          headers: {
            token: token ? `${token}` : "",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };




  return (
    <div
      className={` bg-[#00000099] h-screen  justify-center items-center fixed z-50 w-screen ${
        display ? " flex " : "hidden"
      }`}>
      <div className="bg-gray-800 h-fit px-6 pb-8  pt-5 rounded-lg flex gap-3 flex-col w-[90%] sm:w-96">
        <div className="flex justify-between">
          <h1 className="text-white text-center">Add Task</h1>
          <img
            onClick={toggleDisplay}
            className="w-6 cursor-pointer"
            src="./close.svg"
            alt="close"
          />
        </div>
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          className="py-1 px-4 bg-gray-600 w-full text-white shadow-2xl  "
        />
        <textarea
          ref={descRef}
          name="description"
          id="description"
          rows={6}
          placeholder="Description.."
          className="bg-gray-600 py-1 px-4 text-white shadow-2xl "></textarea>
        <div className="flex justify-between pt-2">
          <p className="text-blue-400">{message}</p>
          <button
            onClick={addTask}
            className="cursor-pointer bg-blue-500 w-fit px-6 py-1 rounded-md text-white hover:bg-blue-400">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
