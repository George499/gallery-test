import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="dark:bg-gray-800 bg-gray-100 relative overflow-hidden h-full w-full ">
      <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 top-1/6 transform rotate-160 animate-pulse blur-xl opacity-70 animate-blob"></div>
      <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse blur-xl opacity-70 animate-blob"></div>
      <div className="relative">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
