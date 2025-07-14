import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import {Route,Routes} from 'react-router-dom';
function App() {

  return (
  <Routes>
    <Route path="/"           element={<Landing/>} />
    <Route path="/login"      element={<LoginPage/>} />
    <Route path="/signup"    element={<SignUpPage/>} />
  </Routes>

  )
}

export default App
