import { BrowserRouter,Routes,Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { SignUp } from './pages/SignUp';
import { SignIn } from "./pages/SignIn";
import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";


const App = () => {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/test" element={<Test/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App