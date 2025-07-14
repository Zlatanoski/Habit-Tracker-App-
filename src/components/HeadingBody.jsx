import React from 'react';

function HeadingBody() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-brandWhite px-4">
            {/* Inner container with spacing control */}
            <div className="mt-20 text-center">
                <h1 className="font-bold font-inter text-[42px] md:text-[60px] text-brandBlue leading-tight">
                    Build better habits,<br />One day at a time
                </h1>
                <p className="mt-6 max-w-xl mx-auto text-lg text-brandBlue font-medium">
                    Harness the power of daily routines to transform your lifestyle.
                </p>
                <button className="mt-8 bg-brandBlue hover:bg-brandBlueHover px-6 py-3 rounded-xl font-semibold text-white">
                    Try BBetter Free
                </button>
            </div>
        </div>
    );
}

export default HeadingBody;
