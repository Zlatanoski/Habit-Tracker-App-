import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Profile from "./components/Profile";
import Pricing from "./components/Pricing";
import Dashbord from "./components/Dashbord";



function App() {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        let mounted = true;

//Added mounted to prevent setUser before getSession finishes but user already redirected and unmounted the component
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            setUser(session?.user ?? null);
            setAuthReady(true);
        });


        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            mounted = false;

            subscription.unsubscribe();

        };
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    !authReady
                        ? null
                        : user
                            ? <Navigate to="/dashbord" replace />
                            : <Landing />
                }
            />
            <Route
                path="/login"
                element={
                    !authReady
                        ? null
                        : user
                            ? <Navigate to="/dashbord" replace />
                            : <LoginPage />
                }
            />
            <Route
                path="/signup"
                element={
                    !authReady
                        ? null
                        : user
                            ? <Navigate to="/dashbord" replace />
                            : <SignUpPage />
                }
            />

            <Route
                path="/dashbord"
                element={
                    !authReady
                        ? null
                        : user
                            ? <Dashbord user={user} setUser={setUser} />
                            : <Navigate to="/login" replace />
                }
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
        </Routes>
    );
}

export default App;
