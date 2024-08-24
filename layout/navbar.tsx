import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-800">
                    <a href="/">Elessi</a>
                </div>

                {/* Navigation Links */}
                <div className="space-x-6 hidden md:flex">
                    <a href="#" className="text-gray-600 hover:text-black">Home</a>
                    <a href="#" className="text-gray-600 hover:text-black">Shop</a>
                    <a href="#" className="text-gray-600 hover:text-black">Product</a>
                    <a href="#" className="text-gray-600 hover:text-black">Elements</a>
                </div>

                {/* Right Icons */}
                <div className="space-x-4 flex items-center">
                    <a href="#" className="text-gray-600 hover:text-black">Login</a>
                    <a href="#" className="text-gray-600 hover:text-black">Register</a>
                    <a href="#" className="relative text-gray-600 hover:text-black">
                        <span className="material-icons">shopping_cart</span>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
