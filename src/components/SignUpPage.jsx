import {Link} from "react-router-dom";
import {supabase} from "../supabaseClient";
import {useState} from "react";

function SignUpPage() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault(); // if this is not called then react refreshes and loses state

        const {data , error} = await supabase.auth.signUp({name,surname,email,password,});  // data and error as object because thats how supabase returns objects

        if (error) {
            alert(error.message);
        } else {
            alert('Check your email to confirm your account!');
        }

    }


    return (
        <div>
            <div className="flex items-center min-h-screen bg-brandPrussian">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign up</h1>
                            <p className="text-gray-500 dark:text-gray-400">Create your account to get started</p>
                        </div>
                        <div className="m-7">
                            <form  onSubmit={handleSignUp} >
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="John"
                                            onChange={(e)=> setName(e.target.value)}

                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Doe"
                                            onChange={(e)=> setSurname(e.target.value)}
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e)=> setPassword(e.target.value)}
                                        placeholder="Your Password"
                                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <button
                                        type="submit"
                                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
                                    >
                                        Sign up
                                    </button>
                                </div>
                                <p className="text-sm text-center text-gray-400">
                                    Already have an account?{" "}

                                       <Link to="/login"  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-300">Sign in</Link>




                                    .
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUpPage