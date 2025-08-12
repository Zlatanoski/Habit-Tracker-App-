import React from 'react';
import logoUrl from '../assets/logofinal.svg';
import {Link} from 'react-router-dom';
function Navbar() {
    return (
        <nav className="fixed w-full h-16  bg-brandBlue z-10 text-white px-6 flex items-center justify-between ">
            <div className="flex items-center">
                <img src={logoUrl} alt="BBetter logo" className="h-12 w-12" />
            </div>

            <div className="absolute left-1/2   -translate-x-1/2 flex gap-4">

                    <Link to="/pricing" className="rounded-xl px-4 py-2  hover:-translate-y-0.5 transform hover:shadow-brandBlue/50 hover:scale-105 text-sm hover:opacity-90 font-bold hover:shadow-lg hover:bg-brandBlueHover">Pricing</Link>

                {/*  This one below has to be changed to Link when the Blog page gets done ...      */}
                <button className="rounded-xl px-4 py-2 text-sm transform hover:-translate-y-0.5 hover:shadow-brandBlue/50 hover:scale-105 font-bold hover:opacity-90  hover:shadow-lg hover:bg-brandBlueHover">
                    Blog
                </button>
            </div>

            <div className="flex items-center transform gap-4">
                <Link to="/login" className="rounded-xl px-4 py-2 text-sm transform hover:-translate-y-0.5 hover:shadow-brandBlue/50 hover:shadow-lg hover:opacity-90  hover:scale-105 font-bold hover:bg-brandBlueHover">
                    Log in
                </Link>
                <Link to="/signup" className="bg-brandBlue rounded-xl px-6 py-2 text-sm hover:-translate-y-0.5 hover:shadow-brandBlue/50 transform hover:shadow-lg hover:opacity-90  hover:scale-105 font-bold hover:bg-brandBlueHover">
                    Sign up
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
