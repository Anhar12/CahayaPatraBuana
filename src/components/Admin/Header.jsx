import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

function Header({ sidebarState, onToggleSidebar }) {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-green-800 text-lg cursor-pointer"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {!sidebarState && (
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-green-800 hidden md:block">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      <span className="text-slate-700 font-semibold text-sm md:text-base">
        Selamat Datang, <span className="text-green-700">Admin</span>
      </span>
    </header>
  )
}

export default Header
