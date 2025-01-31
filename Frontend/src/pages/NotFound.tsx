import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logOut = () => {
    try {
      localStorage.setItem("token", "");
      alert("You have been Logged Out!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <Link
                to={"/"}
                className=" min-md:hidden text-white px-4 py-2 rounded-lg transition-colors">
                Home
              </Link>
            </div>
          </div>
        </nav>

        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <img className="md:w-[30vw] w-[60vw]" src="404.png" alt="404" />
          <h1 className="text-white text-md md:text-xl">
            Oops! Page Not Found (404) 😕
          </h1>
          <p className="w-[80%] md:w-[70%] text-gray-400 text-center py-3">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or the URL is incorrect. Try checking the URL or go back to
            the
            <Link className="text-blue-600 underline cursor-pointer" to={"/"}>
              Home Page.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
