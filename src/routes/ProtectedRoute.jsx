import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import LoadingOverlay from "../components/LoadingOverlay"

function ProtectedRoute({ children }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Akses ditolak",
        text: "Silakan login terlebih dahulu untuk mengakses halaman admin",
        confirmButtonColor: "#016630",
      })

      setAllowed(false)
    } else {
      setAllowed(true)
    }

    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingOverlay show />
  }

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
