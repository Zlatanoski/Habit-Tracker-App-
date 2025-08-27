import React from 'react';
import ema from '../assets/ema.png';
import john from '../assets/john.png';
import {Link} from "react-router-dom";
import Footerce from "../components/Footer";

function HeadingBody() {
    return (
        <div className="flex font-inter flex-col items-center min-h-screen bg-white ">

            <div className="mt-20 text-center max-w-2xl pt-10  ">
                <h1 className="font-bold font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brandBlue leading-snug">
                    Build better habits,<br />One day at a time
                </h1>
                <p className="mt-6 mb-5 text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                    Harness the power of daily routines to transform your lifestyle.
                </p>
                <Link to='/signup' className=" mt-8 bg-brandBlue hover:bg-brandBlueHover px-6 py-3 rounded-xl font-semibold text-white transition">
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

            <div className=" mt-10 text-center">
                <div className="text-3xl font-bold mb-2  mt-4 font-inter  sm:text-xl md:text-2xl lg:text-3xl ">Plan, Act, Achieve</div>
                <p className= " mt-6 mb-5 text-base sm:text-[15px] md:text-xl text-gray-600 font-medium" >
                    Kickstart your day with a focused, well-structured routine that guides you toward your goals.
                    <br/>
                    Here’s a glimpse of how your day with BBetter could unfold:
                </p>
            </div>



            <div className="col-span-full flex justify-center mt-10">
                <figure className="w-full max-w-[1200px] px-2">
                    <div className="rounded-2xl border-[1px] border-white/5  bg-slate-900/30 p-[6px] shadow-2xl">
                        <img
                            src="/table.png"
                            alt="Daily habits preview"
                            className="w-full h-auto rounded-xl object-contain"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </figure>
            </div>



        <Footerce></Footerce>


        </div>



    );
}

export default HeadingBody;
