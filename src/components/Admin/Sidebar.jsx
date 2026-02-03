import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStore,
  faReceipt,
  faWarehouse,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

function Sidebar({ open, onLogout, onToggleSidebar }) {
  const menuClass = (isActive) =>
    `
      w-full flex items-center gap-3 px-4 py-2 rounded-md
      transition cursor-pointer
      ${
        isActive
          ? "bg-green-700 font-semibold"
          : "hover:bg-green-700"
      }
    `

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen w-64
        bg-green-800 text-white
        flex flex-col justify-between
        p-4
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* TOP */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg">Admin Panel</span>

          <button
            onClick={onToggleSidebar}
            className="ml-auto md:hidden text-white text-md font-bold opacity-80 hover:opacity-100 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* MENU */}
        <nav className="space-y-2">
          <NavLink
            to="/admin/transaksi"
            className={({ isActive }) => menuClass(isActive)}
          >
            <FontAwesomeIcon icon={faReceipt} />
            Transaksi
          </NavLink>

          <NavLink
            to="/admin/pangkalan"
            className={({ isActive }) => menuClass(isActive)}
          >
            <FontAwesomeIcon icon={faStore} />
            Pangkalan
          </NavLink>

          <NavLink
            to="/admin/storage"
            className={({ isActive }) => menuClass(isActive)}
          >
            <FontAwesomeIcon icon={faWarehouse} />
            Storage
          </NavLink>
        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 transition"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
