import React from 'react';
import logoUrl from '../assets/logofinal.svg';

function Navbar() {
    return (
        <nav className="w-full h-16 bg-brandDark text-white px-6 flex items-center">
            <div className="flex items-center">
                <img src={logoUrl} alt="BBetter logo" className="h-12 w-12" />
            </div>

            <div className="flex gap-6 mx-auto">
                <button className="rounded-xl px-4 py-2 text-sm font-bold hover:bg-gray-700">
                    Pricing
                </button>
                <button className="rounded-xl px-4 py-2 text-sm font-bold hover:bg-gray-700">
                    Blog
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="rounded-xl px-4 py-2 text-sm font-bold hover:bg-gray-700">
                    Log in
                </button>
                <button className="bg-brandBlue rounded-xl px-6 py-2 text-sm font-bold hover:bg-brandBlueHover">
                    Sign up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
