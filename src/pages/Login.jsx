import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import Swal from "sweetalert2"
import LoadingOverlay from "../components/LoadingOverlay"

function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/admin/dashboard")
    }
  }, [])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Username dan password wajib diisi",
        confirmButtonText: "OK",
        confirmButtonColor: "#016630",
      })
      return
    }

    try {
      setLoading(true)

      const res = await login(username, password)
      localStorage.setItem("token", res.token)

      await Swal.fire({
        icon: "success",
        title: "Login berhasil",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#016630",
      })

      navigate("/admin/dashboard")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: err.message || "Username atau password salah",
        confirmButtonText: "OK",
        confirmButtonColor: "#016630",
        background: "#ffffff",
        color: "#1f2937",
        customClass: {
          popup: "rounded-xl",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen font-body">
      <LoadingOverlay show={loading} />
      
      <img
        src="/images/login-bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-l from-black/50 via-black/20 to-transparent"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-20">
        <div
          className="
            w-full max-w-md bg-white rounded-2xl p-8
            border border-green-700/40
            shadow-[0_14px_0_0_rgba(22,163,74,0.45)]
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-green-800">
                Login Admin
              </h1>
              <p className="text-sm text-slate-600">
                Sistem Informasi PT. Cahya Patra Buana
              </p>
            </div>
          </div>

          <div className="h-px bg-green-600/60 mb-6"></div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full px-4 py-2 rounded-md
                  border border-slate-300
                  focus:outline-none
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-2 rounded-md
                  border border-slate-300
                  focus:outline-none
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600
                "
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                relative px-6 py-3
                bg-green-50 text-green-700 font-semibold
                rounded-md border border-green-700
                shadow-[0_6px_0_0_rgb(0,166,62)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgb(0,166,62)]
                active:translate-y-[6px]
                active:shadow-none
                ${loading ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            © PT. Cahya Patra Buana
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
