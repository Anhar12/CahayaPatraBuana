import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGauge, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons"

function Sidebar({ open, onLogout, onToggleSidebar }) {
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
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg">
            Admin Panel
          </span>
          <button
            onClick={onToggleSidebar}
            className="ml-auto md:hidden text-white text-md cursor-pointer font-bold hover:opacity-100 opacity-80 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className="space-y-2">
          <div className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-green-700 opacity-90">
            <FontAwesomeIcon icon={faGauge} />
            Dashboard
          </div>
        </nav>
      </div>

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
