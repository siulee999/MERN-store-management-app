import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import "./NavbarLayout.css"

export default function NavbarLayout() {
  return (
    <div className="nav-layout">
      <Navbar />
      <Outlet />
    </div>
  )
}