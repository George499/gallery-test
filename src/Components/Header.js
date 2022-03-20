import React, { useState } from "react";
import Navbar from "./Navbar";
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

function Header() {
  const [mode, setMode] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(
    <SunIcon className="h-7 w-7 text-gray-800" />
  );
  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add("dark");
      setToggleBtn(<MoonIcon className="h-7 w-7 text-white" />);
      setMode((current) => (current = !current));
    }

    if (!mode) {
      document.documentElement.classList.remove("dark");
      setToggleBtn(<SunIcon className="h-7 w-7 text-gray-800" />);
      setMode((current) => (current = !current));
    }
  };
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="container mx-auto h-[80px] flex justify-between items-center  dark:text-gray-300">
      <div>
        <a href="/" className="flex flex-col justify-center items-center">
          <p className="m-0 mx-1 text-2xl dark:text-white font-semibold">
            G.I.
          </p>
        </a>
      </div>
      <Navbar />
      <div className="ml-auto font-medium flex">
        <button onClick={() => toggleDarkMode()}>{toggleBtn}</button>
        {/* Hamburger */}
        <div
          onClick={handleClick}
          className="md:hidden z-10 cursor-pointer align-self-center mx-4"
        >
          {!nav ? (
            <MenuIcon className="h-5 w-5 dark:text-white " />
          ) : (
            <XIcon className="h-5 w-5 text-white  " />
          )}
        </div>
        {/* Mobile menu */}
        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center "
          }
        >
          <li className="py-6 text-4xl dark:text-white">Home</li>
          <li className="py-6 text-4xl dark:text-white">About</li>
          <li className="py-6 text-4xl dark:text-white">Skills</li>
          <li className="py-6 text-4xl dark:text-white">Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
