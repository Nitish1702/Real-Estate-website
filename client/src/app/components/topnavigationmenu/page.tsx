'use client'
import React, { useEffect, useState } from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { handleLogout } from "../sidebar/page";
type MenuState = "experience" | "landlords" | "brokers" | "business" | "language" | "user" | null;

function TopNavigationMenu() {
    const [openMenu, setOpenMenu] = useState<MenuState>(null); // To manage open dropdown menus
    const [darkMode, setDarkMode] = useState(false); // Dark Mode State
    const [loggedIn, setloggedIn] = useState(false)
    useEffect(() => {
        const isLoggedin = localStorage.getItem('isLoggedin');
        if (isLoggedin) {
            setloggedIn(true)
        }
    }, []);
    
    const handleMenuToggle = (menu: MenuState) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className={`relative hidden md:flex w-full justify-end ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
            <div className="flex items-center w-[90%] max-w-screen-xl mx-auto px-6 py-4">
                <ul className="flex space-x-8 w-full justify-end">
                    {/* Main Navigation Items */}
                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("experience")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            Your Experience
                        </button>
                        {openMenu === "experience" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    <a href="#experience-details" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        Experience Details
                                    </a>
                                    <a href="#how-it-works" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        How it Works
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("landlords")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            For Landlords
                        </button>
                        {openMenu === "landlords" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    <a href="#list-property" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        How to List a Property
                                    </a>
                                    <a href="#manage-properties" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        Manage Your Properties
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("brokers")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            For Brokers
                        </button>
                        {openMenu === "brokers" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    <a href="#find-properties" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        Find Properties
                                    </a>
                                    <a href="#partner-with-us" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        Partner with Us
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("business")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            For Business
                        </button>
                        {openMenu === "business" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    <a href="#business-solutions" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        Business Solutions
                                    </a>
                                    <a href="#corporate-plans" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        Corporate Plans
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    <div className="h-8 bg-gray-300 w-[0.05rem]"></div>

                    {/* Language Dropdown */}
                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("language")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            En
                        </button>
                        {openMenu === "language" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    <a href="#english" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        English
                                    </a>
                                    <a href="#french" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        French
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    {/* User Actions Dropdown */}
                    <li className="relative group">
                        <button
                            onClick={() => handleMenuToggle("user")}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            <FaUser className="text-blue-600 text-2xl" />
                        </button>
                        {openMenu === "user" && (
                            <div className="absolute left-0 mt-2 bg-white shadow-xl z-10 w-screen md:w-[250px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="py-4 px-6">
                                    {loggedIn ? <button onClick={() => {
                                        setloggedIn(false)
                                        return handleLogout()
                                    }} className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        Log Out
                                    </button>:<a href="loginpage" className="block text-gray-600 hover:text-blue-600 transition duration-200 mb-2">
                                        Log In
                                    </a>}
                                    <a href="registerpage" className="block text-gray-600 hover:text-blue-600 transition duration-200">
                                        Register
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>

                    {/* Dark Mode Toggle */}
                    <li>
                        <button
                            onClick={toggleDarkMode}
                            className={`text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopNavigationMenu;
