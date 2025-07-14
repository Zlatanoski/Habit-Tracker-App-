import React from 'react';
import ema from '../assets/ema.png';
import john from '../assets/john.png';

function HeadingBody() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-white px-4">
            {/* Hero text */}
            <div className="mt-20 text-center max-w-2xl">
                <h1 className="font-bold font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brandBlue leading-snug">
                    Build better habits,<br />One day at a time
                </h1>
                <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 font-medium">
                    Harness the power of daily routines to transform your lifestyle.
                </p>
                <button className="mt-8 bg-brandBlue hover:bg-brandBlueHover px-6 py-3 rounded-xl font-semibold text-white transition">
                    Try BBetter Free
                </button>
            </div>

            {/* 3-col character grid */}
            <div className="w-full px-6 py-2 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                {/* Left: John */}
                <div className="flex justify-center">
                    <img
                        src={john}
                        alt="John"
                        className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
                    />
                </div>

                {/* Center: Callout */}
                <div className="flex flex-col justify-center text-center px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brandBlue mb-4">
                        Want to be smart and jacked like John—<br className="hidden md:block" />or pretty and driven like Ema?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">
                        Then start building better habits with BBetter—your all-in-one app to stay organized, consistent, and in control of your goals.
                    </p>
                </div>

                {/* Right: Ema */}
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
