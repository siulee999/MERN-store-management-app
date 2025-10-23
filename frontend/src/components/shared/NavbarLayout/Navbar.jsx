import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import axios from "../../../api/axios.js";

import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { navList } from "../../../data/navbar.js";


export default function Navbar() {
  const { auth, setAuth } = useAuth();
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpened(!isNavbarOpened);
  }

  const checkLoginState = async (e) => {
    if (auth.token) {
      e.preventDefault();

      try {
        await axios.post("/auth/logout", null);
        setAuth({});
        alert("Logged out successfully.");

      } catch (err) {
        alert("Failed to log out. Please try again.");
        console.log(err);
      }
    }
  }

  return (
    <>
      <nav
        className={`w-full sm:h-dvh ${isNavbarOpened ? "h-85 sm:w-60" : "h-12 sm:w-16"} 
          overflow-hidden transition-[height,width] duration-300 ease-in-out`}
      >
        <div>
          <div className="flex items-center m-2 sm:py-2 sm:border-b-1 sm:border-gray-400 overflow-hidden">
            <div
              className="toggle-nav-btn shrink-0"
              onClick={toggleNavbar}
            >
              <RxHamburgerMenu />
            </div>
            <span className="font-bold whitespace-nowrap">
              Admin Dashboard
            </span>
          </div>

          <ul className="flex flex-col gap-1">
            {navList?.map(item => (
              <li
                key={item.label}
                className="rounded-xl overflow-hidden"
              >
                <NavLink
                  to={item.route}
                  className={({ isActive }) => isActive ? "nav-link active-nav-link" : "nav-link"}
                >
                  {({ isActive }) => (
                    <>
                      <div className="size-8 flex justify-center items-center m-2 text-gray-100 shrink-0">
                        {isActive ? <item.ActiveIcon /> : <item.NoneActiveIcon />}
                      </div>
                      <span>{item.label}</span>
                    </>)
                  }
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <NavLink
          to="/login"
          className="w-full"
          onClick={checkLoginState}
        >
          <button className={`rounded-lg w-full flex items-center pl-[33%] sm:pl-0 mb-3 hover:cursor-pointer overflow-hidden ${auth.token ? "bg-red-900/70 hover:bg-red-900" : "bg-green-900/70 hover:bg-green-900"}`}
          >
            <div className="size-8 flex justify-center items-center m-2 text-gray-200 shrink-0">
              {auth.token ? <TbLogout2 /> : <TbLogin2 />}
            </div>
            <span className="whitespace-nowrap">{auth.token ? "Log out" : "Log in"}</span>
          </button>
        </NavLink>
      </nav>

      {isNavbarOpened && <div className="fixed inset-0 bg-black/30 z-50 sm:hidden" onClick={toggleNavbar}></div>}
    </>
  )
}