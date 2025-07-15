import React from 'react';
import ema from '../assets/ema.png';
import john from '../assets/john.png';
import {Link} from "react-router-dom";

function HeadingBody() {
    return (
        <div className="flex font-inter flex-col items-center min-h-screen bg-white px-4">

            <div className="mt-20 text-center max-w-2xl pt-10  ">
                <h1 className="font-bold font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brandBlue leading-snug">
                    Build better habits,<br />One day at a time
                </h1>
                <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                    Harness the power of daily routines to transform your lifestyle.
                </p>
                <Link to='/dashbord' className="mt-8 bg-brandBlue hover:bg-brandBlueHover px-6 py-3 rounded-xl font-semibold text-white transition">
                    Try BBetter Free
                </Link>
            </div>


            <div className="w-full px-6 py-6 grid grid-cols-1 xl:grid-cols-3 items-center gap-8 border-b-2 border-gray-200 pb-0 mb-0">

                <div className="flex justify-center">
                    <img
                        src={john}
                        alt="John"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
                    />
                </div>


                <div className="flex flex-col justify-center items-center px-4">
                    <div className="bg-brandBlue/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-brandBlue/20 max-w-[600px]">
                        <h2 className="text-2xl font-inter sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brandBlue leading-snug mb-4">
                            Want to be smart and jacked like John—<br className="hidden md:block" />
                            or pretty and driven like Ema?
                        </h2>
                        <p className="text-base sm:text-lg md:text-2xl text-gray-700">
                            Then start building better habits with BBetter—your all-in-one app to stay organized, consistent, and in control of your goals.
                        </p>
                    </div>
                </div>



                <div className="flex justify-center">
                    <img
                        src={ema}
                        alt="Ema"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
                    />
                </div>
            </div>
        </div>
    );
}

export default HeadingBody;
