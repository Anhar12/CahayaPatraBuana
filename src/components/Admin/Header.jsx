import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

function Header() {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <button className="text-green-800 text-lg">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <span className="text-slate-700 font-semibold">
        Login sebagai <span className="text-green-700">Admin</span>
      </span>
    </header>
  )
}

export default Header
