import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = { Name: "John Doe" };
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
  };
  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/">
          <img src={"/logo.svg"} alt="" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.Name}</p>
          <button
            onClick={logoutUser}
            className="group px-8 py-2.5 bg-green-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-green-700"
          >
            <p className="relative h-6 overflow-hidden">
              <span className=" block transition-transform duration-300 group-hover:-translate-y-full">
                LoggedIn
              </span>
              <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
                Log Out
              </span>
            </p>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
