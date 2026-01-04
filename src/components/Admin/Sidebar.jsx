import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGauge,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

function Sidebar() {
  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col justify-between p-6">

      <div>
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="font-bold text-lg">
            Admin Panel
          </span>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-green-700">
            <FontAwesomeIcon icon={faGauge} />
            Dashboard
          </button>

          {/* menu lain nanti tinggal nambah */}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 transition">
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </button>

    </aside>
  )
}

export default Sidebar
