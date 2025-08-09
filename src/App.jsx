import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import {Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashbord';
import {useEffect, useState} from "react";
import {supabase} from "./supabaseClient";
import Profile from "./components/Profile";
import Pricing from "./components/Pricing";

function App() {

  const [user,setUser] = useState(null);

  useEffect(()=>{


    // on page reload if session exist load it in user if it doesnt make user null again
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    //returns a subscription object that we can use to stop listening later
    const { data: { subscription },} = supabase.auth.onAuthStateChange(async (event,session)=>{

      if(event === "SIGNED_IN" && session?.user){

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


        const { data, error } = await supabase
            .from("profiles")
            .upsert({
              id: session.user.id,
              timezone
            });

        if (error) {
          console.error('Error upserting profile:', error);
        } else {
          console.log('Profile upserted successfully:', data);
        }
      }

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
              ? <Dashboard user={user} setUser={setUser}/>
              : <Navigate to="/login" replace />
        }
    />
    <Route path="/profile" element={<Profile />} />
    <Route path="/pricing" element={<Pricing/>} />

  </Routes>

  )
}

export default App
