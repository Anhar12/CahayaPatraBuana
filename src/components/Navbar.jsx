import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faCircleInfo, faEnvelope, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  const [open, setOpen] = useState(false)

  const baseStyle =
    "relative text-md font-semibold flex items-center gap-2 transition " +
    "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:bg-green-100 " +
    "after:rounded-full after:transition after:duration-300 after:origin-center " +
    "after:-translate-x-1/2 after:w-full after:scale-x-0"

  const linkClass = (isActive) =>
    `${baseStyle} ${
      isActive
        ? "text-green-100"
        : "text-green-100/50 hover:text-green-100 hover:after:scale-x-100"
    }`

  return (
    <nav className="bg-green-600 shadow sticky top-0 z-50 font-heading backdrop-blur-md ">
      <div className="md:px-12 px-6 py-0 flex items-center justify-between">

        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="../src/assets/logo.png"
            className="w-14 h-14 object-contain"
            alt="Company Logo"
          />
          <h1 className="text-xl font-bold text-green-100">PT. Cahya Patra Buana</h1>
        </NavLink>

        {/* Desktop Navbar */}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => linkClass(isActive)}>
            <FontAwesomeIcon icon={faCircleInfo} />
            About
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => linkClass(isActive)}>
            <FontAwesomeIcon icon={faEnvelope} />
            Contact
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-green-100 text-2xl"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-green-700 shadow-lg z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-800">
          <h2 className="text-lg font-bold text-green-100">PT. Cahya Patra Buana</h2>
          <button onClick={() => setOpen(false)} className="text-green-100 text-2xl ">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-6 px-6 py-6 bg-green-700 h-screen">

          <NavLink
            to="/"
            className={({ isActive }) => linkClass(isActive)}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => linkClass(isActive)}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => linkClass(isActive)}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Contact
          </NavLink>

        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40 h-screen"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Navbar
