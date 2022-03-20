import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="hidden md:flex ">
        <Link className="m-0 mx-1  dark:text-white" to="/">
          Home
        </Link>
        <Link className="m-0 mx-1  dark:text-white" to="/details">
          Details
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
