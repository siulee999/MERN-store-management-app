import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineStore, MdStore } from "react-icons/md";
import { RiQuestionAnswerLine, RiQuestionAnswerFill } from "react-icons/ri";
import { RiGiftLine, RiGiftFill } from "react-icons/ri";
import { TbLogin2, TbLogout2 } from "react-icons/tb";


export default function Navbar() {
  const { auth, setAuth } = useAuth();
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  function toggleNavbar() {
    setIsNavbarOpened(!isNavbarOpened);
  }

  async function checkLoginState(e) {
    if (auth.token) {
      e.preventDefault();

      try {
        await axios.post("/auth/logout", null);
        setAuth({});
        alert("Logged out successfully.");  

      } catch(err) {
        alert("Failed to log out. Please try again.");  
        console.log(err);
      }
    }
  }

  return (
    <>
    <nav className={`w-full sm:h-dvh ${isNavbarOpened ? "h-75 sm:w-60" : "h-12 sm:w-16"} overflow-hidden transition-[height,width] duration-300 ease-in-out`}>
      <div>
        <div className="flex items-center m-2 sm:py-2 sm:border-b-1 sm:border-gray-400 overflow-hidden">
          <div className="toggle-nav-btn shrink-0"
                onClick={toggleNavbar}>
            <RxHamburgerMenu /> 
          </div>
          <span className="font-bold whitespace-nowrap">Admin Dashboard</span>
        </div>

        <ul className="flex flex-col gap-1">
          <li className="rounded-xl overflow-hidden">
            <NavLink to="/products" className={({isActive}) => isActive ? "nav-link active-nav-link" : "nav-link"}>
              {
                ({isActive}) => (
                  <>
                    <div className="size-8 flex justify-center items-center m-2 text-gray-100 shrink-0">
                      {isActive ? <RiGiftFill /> : <RiGiftLine />}
                    </div>
                    <span>Products</span>
                  </>
                )
              }
            </NavLink>          
          </li>

          <li className="rounded-xl overflow-hidden">
            <NavLink to="/stores" className={({isActive}) => isActive ? "nav-link active-nav-link" : "nav-link"}>
              {
                ({isActive}) => (
                  <>
                    <div className="size-8 flex justify-center items-center m-2 text-gray-100 shrink-0">
                      {isActive ? <MdStore /> : <MdOutlineStore/>}
                    </div>
                    <span>Stores</span>
                  </>
                )
              }
            </NavLink>
          </li>

          <li className="rounded-xl overflow-hidden">
            <NavLink to="/faqs" className={({isActive}) => isActive ? "nav-link active-nav-link" : "nav-link"}>
              {
                ({isActive}) => (
                  <>
                    <div className="size-8 p-1 flex justify-center items-center m-2 text-gray-100 shrink-0">
                      {isActive ? <RiQuestionAnswerFill /> : <RiQuestionAnswerLine/>}
                    </div>
                    <span>FAQs</span>
                  </>
                )
              }
            </NavLink>
          </li>
        </ul>
      </div>

      <NavLink to="/login" className="w-full" onClick={checkLoginState}>
        <button className={auth.token ? "bg-red-900/70 hover:bg-red-900 login-logout-btn": "bg-green-900/70 hover:bg-green-900 login-logout-btn"}>
          <div className="size-8 flex justify-center items-center m-2 text-gray-200 shrink-0">
            {
              auth.token ? <TbLogout2 /> : <TbLogin2 />
            }
          </div>
          <span className="whitespace-nowrap">{ auth.token ? "Log out" : "Log in"}</span>
        </button>
      </NavLink>
    </nav>

    {isNavbarOpened && <div className="fixed inset-0 bg-black/30 z-50 sm:hidden" onClick={toggleNavbar}></div>}
    </>
  )
}