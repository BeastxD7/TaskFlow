import { CheckCircle, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

export function LandingPage() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logOut = () => {
    try {
      localStorage.setItem("token", "");
      toast.success("You have been Logged Out!",{
        position: 'bottom-right',
      });
    } catch (error) {
      console.log(error);
    }
  };


const handleStartBtn = () => {
  if(token) {
    navigate("/dashboard")
  }else{
    navigate("/signup")
  }
}
  

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Task Organization",
      description:
        "Efficiently organize and prioritize your tasks with intuitive tools",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Updates",
      description:
        "Stay synchronized with instant updates across all your devices",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members on shared projects",
    },
  ];

  return (

    <div className="min-h-screen bg-white bg-gradient-to-r from-slate-900 to-gray-950 transition-colors duration-300">
       <ToastContainer />
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="./logo.svg" alt="logo" className="w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white cursor-pointer">
                TaskFlow
              </span>
            </div>
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2">
                {token ? (
                  <Link
                    to={"/dashboard"}
                    className="hover:bg-blue-600  rounded-md text-white bg-linear-to-r from-cyan-500 to-blue-500  px-2 py-1 transition-colors ">
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to={"/signin"}
                    className=" text-white  hover:text-blue-500 px-3 py-2">
                    Login
                  </Link>
                )}

                {token ? (
                  <button
                    onClick={logOut}
                    className=" text-white px-2 py-1 rounded-lg transition-colors cursor-pointer">
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/signup"}
                    className="bg-linear-to-r from-cyan-500 to-blue-500  text-white px-4 py-2 rounded-lg transition-colors">
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 max-sm:leading-14 md:leading-loose ">
              Manage Tasks with {" "}
              <span className="bg-linear-to-r from-cyan-500 to-blue-700 px-4 rounded-2xl">
                Efficiency
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Stay organized, focused, and in control with our intuitive task
              management solution. Perfect for individuals and teams.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartBtn}
                className="cursor-pointer bg-linear-to-r from-cyan-500 to-blue-500  hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                Get Started Free
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 dark:text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of users who have transformed their task management
            experience.
          </p>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Taskify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
