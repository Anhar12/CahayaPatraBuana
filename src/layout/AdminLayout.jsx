import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Admin/Sidebar"
import Header from "../components/Admin/Header"
import Swal from "sweetalert2"

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      confirmButtonColor: "#016630",
      cancelButtonColor: "#6a7282",
    })

    if (!result.isConfirmed) return

    localStorage.removeItem("token")

    await Swal.fire({
      icon: "success",
      title: "Logout berhasil",
      timer: 1200,
      timerProgressBar: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#016630",
    })

    navigate("/login", { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 font-body">
      <Sidebar
        open={sidebarOpen}
        onLogout={handleLogout}
      />

      <div
        className={`
          transition-all duration-300
          ${sidebarOpen ? "pl-64" : "pl-0"}
        `}
      >
        <Header
          onToggleSidebar={toggleSidebar}
          sidebarState={sidebarOpen}
        />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
