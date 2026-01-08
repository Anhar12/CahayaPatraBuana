import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { createElpiji, updateElpiji } from "../../services/elpijiService"
import LoadingOverlay from "../LoadingOverlay"

function ElpijiFormModal({ onClose, onSuccess, initialData }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      console.log(initialData)
      setForm({
        pangkalan: initialData.pangkalan,
        pemilik: initialData.pemilik,
        nomor: initialData.nomor,
        alamat: initialData.alamat,
        elpiji_3kg: initialData.elpiji_3kg,
        elpiji_12kg: initialData.elpiji_12kg,
      })
    }
  }, [initialData])

  const handleClose = () => {
    setClosing(true)
    setVisible(false)

    setTimeout(() => {
      onClose()
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 10)
  }, [])

  const [form, setForm] = useState({
    pangkalan: "",
    pemilik: "",
    nomor: "",
    alamat: "",
    elpiji_3kg: "",
    elpiji_12kg: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...form,
        elpiji_3kg: Number(form.elpiji_3kg),
        elpiji_12kg: Number(form.elpiji_12kg),
      }

      if (initialData) {
        await updateElpiji(initialData.id, payload)
      } else {
        await createElpiji(payload)
      }

      onSuccess()
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal menyimpan data",
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleClose}
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 px-4
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-md bg-white rounded
          overflow-hidden relative
          shadow-[0_14px_0_0_rgba(22,163,74,0.45)]
          transform transition-all duration-300
          ${visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-green-700 p-4">
          <h2 className="text-lg md:text-xl font-bold text-white">
            Tambah Data Pangkalan LPG
          </h2>

          <button
            onClick={handleClose}
            className="
              text-white text-xl font-bold
              hover:opacity-100 opacity-80
              transition cursor-pointer
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4 p-4 border border-green-700/40">
          {[
            { label: "Pangkalan", name: "pangkalan", placeholder: "Pangkalan..." },
            { label: "Pemilik", name: "pemilik", placeholder: "Joko..." },
            { label: "Nomor HP", name: "nomor", placeholder: "08xxxxx" },
            { label: "Alamat", name: "alamat", placeholder: "Jl...." },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {f.label}
              </label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                required
                placeholder={f.placeholder}
                className="
                  w-full px-4 py-2 rounded-md
                  border border-slate-300
                  focus:outline-none text-sm
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600
                "
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Elpiji 3 Kg
              </label>
              <input
                type="number"
                name="elpiji_3kg"
                value={form.elpiji_3kg}
                onChange={handleChange}
                placeholder="9xx"
                required
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600/40 focus:outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Elpiji 12 Kg
              </label>
              <input
                type="number"
                name="elpiji_12kg"
                value={form.elpiji_12kg}
                onChange={handleChange}
                placeholder="9xx"
                required
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-green-600/40 focus:outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-3 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2
                bg-gray-50 text-gray-700 font-semibold
                rounded-md border border-gray-700
                shadow-[0_6px_0_0_rgb(106,114,130)]
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgb(106,114,130)]
                active:translate-y-[6px]
                active:shadow-none
                disabled:opacity-60
                cursor-pointer transition-all
              "
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1 px-4 py-2
                bg-green-50 text-green-700 font-semibold
                rounded-md border border-green-700
                shadow-[0_6px_0_0_rgb(0,166,62)]
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgb(0,166,62)]
                active:translate-y-[6px]
                active:shadow-none
                disabled:opacity-60
                cursor-pointer transition-all
              "
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>

      <LoadingOverlay show={loading} />
    </div>
  )
}

export default ElpijiFormModal
