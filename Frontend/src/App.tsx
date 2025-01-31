import { BrowserRouter,Routes,Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { SignUp } from './pages/SignUp';
import { SignIn } from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


const App = () => {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/*" element={<NotFound/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App