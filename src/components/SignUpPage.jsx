function SignUpPage() {
    return (
        <div>
            <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign up</h1>
                            <p className="text-gray-500 dark:text-gray-400">Create your account to get started</p>
                        </div>
                        <div className="m-7">
                            <form action="">
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
                                        placeholder="Your Password"
                                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <button
                                        type="button"
                                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
                                    >
                                        Sign up
                                    </button>
                                </div>
                                <p className="text-sm text-center text-gray-400">
                                    Already have an account?{" "}
                                    <a
                                        href="#!"
                                        className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-300"
                                    >
                                        Sign in
                                    </a>
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