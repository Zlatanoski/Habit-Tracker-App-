import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full border-t-8 border-indigo-500 bg-brandDark flex justify-center py-6 sm:py-8 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 sm:gap-12 text-center md:text-left">

                <div className="space-y-1 sm:space-y-2">
                    <h2 className="pb-1 text-gray-500 font-bold text-lg sm:text-xl">Learn more</h2>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">Home</Link>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">About</Link>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">Contact</Link>
                </div>

                <div className="space-y-1 sm:space-y-2">
                    <h2 className="pb-1 text-gray-500 font-bold text-lg sm:text-xl">Social</h2>
                    <a href="https://x.com/boostyouremails" className="block text-brandWhite text-sm sm:text-base hover:underline">Twitter</a>
                    <a href="" className="block text-brandWhite text-sm sm:text-base hover:underline">Facebook</a>
                    <a href="" className="block text-brandWhite text-sm sm:text-base hover:underline">Community</a>
                </div>

                <div className="space-y-1 sm:space-y-2">
                    <h2 className="pb-1 text-gray-500 font-bold text-lg sm:text-xl">Resources</h2>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">FAQ</Link>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">Privacy</Link>
                    <Link to="" className="block text-brandWhite text-sm sm:text-base hover:underline">Terms</Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
