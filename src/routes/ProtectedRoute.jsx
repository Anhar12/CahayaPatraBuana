import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import LoadingOverlay from "../components/LoadingOverlay"
import { checkAuth } from "../services/authService"

function ProtectedRoute({ children }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Akses ditolak",
          text: "Silakan login terlebih dahulu untuk mengakses halaman admin",
          confirmButtonColor: "#016630",
        })

        setAllowed(false)
        setLoading(false)
        return
      }

      try {
        await checkAuth()
        setAllowed(true)
      } catch (err) {
        localStorage.removeItem("token")

        Swal.fire({
          icon: "warning",
          title: "Sesi berakhir",
          text: "Silakan login kembali",
          confirmButtonColor: "#016630",
        })

        setAllowed(false)
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [])

  if (loading) return <LoadingOverlay show />

  if (!allowed) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}

export default ProtectedRoute
