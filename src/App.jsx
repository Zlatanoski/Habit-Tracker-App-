import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import {Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashbord';
import {useEffect, useState} from "react";
import {supabase} from "./supabaseClient";



function App() {

  const [user,setUser] = useState(null);

  useEffect(()=>{


    // on page reload if session exist load it in user if it doesnt make user null again
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    //returns a subscription object that we can use to stop listening later
    const { data: { subscription },} = supabase.auth.onAuthStateChange((_,session)=>{



        //if something changes in the authentication(sign in/sign out events) we have to check whether it changed to null or there is still an user
      setUser(session?.user ?? null)

    });

    return () => subscription.unsubscribe()
  },[]);

  return (
  <Routes>
    <Route path="/"           element={<Landing/>} />
    <Route path="/login"      element={<LoginPage/>} />
    <Route path="/signup"    element={<SignUpPage/>} />
    <Route
        path="/dashbord"
        element={
          user
              ? <Dashboard />
              : <Navigate to="/login" replace />
        }
    />
  </Routes>

  )
}

export default App
