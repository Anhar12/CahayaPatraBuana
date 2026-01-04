function Login() {
  return (
    <div className="relative min-h-screen font-body">
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
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@cpb.co.id"
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
                className="
                  w-full px-4 py-2 rounded-md
                  border border-slate-300
                  focus:outline-none
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600
                "
              />

              {/* Reset Password */}
              <div className="text-right mt-1">
                <a
                  href="/forgot-password"
                  className="text-xs text-green-700 hover:text-green-800 hover:underline transition"
                >
                  Lupa password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              className="
                relative px-6 py-3
                bg-green-50 text-green-700 font-semibold
                rounded-md border border-green-700
                shadow-[0_6px_0_0_rgb(0,166,62)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgb(0,166,62)]
                active:translate-y-[6px]
                active:shadow-none
              "
            >
              Masuk
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-6 text-center">
            © PT. Cahya Patra Buana
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
