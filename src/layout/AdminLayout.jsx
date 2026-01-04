import Sidebar from "../components/Admin/Sidebar"
import Header from "../components/Admin/Header"

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100 font-body">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
