import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import LoadingOverlay from "../LoadingOverlay"
import { getElpiji } from "../../services/elpijiService"
import {
  getElpijiById,
  createTransaksi,
  updateTransaksi,
} from "../../services/transaksiService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function TransaksiFormModal({ onClose, onSuccess, initialData }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [elpijiList, setElpijiList] = useState([])

  const [form, setForm] = useState({
    elpiji_id: "",
    pangkalan: "",
    pemilik: "",
    nomor: "",
    alamat: "",
    nama_driver: "",
    tanggal: "",
    lpg_3kg: "",
    lpg_12kg: "",
  })

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 300)
  }

  useEffect(() => {
    const fetchElpiji = async () => {
      try {
        const res = await getElpiji()
        setElpijiList(res.data.data)
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal memuat data pangkalan",
          confirmButtonColor: "#016630",
        })
      }
    }
    fetchElpiji()
  }, [])

  useEffect(() => {
    if (initialData) {
      setForm({
        elpiji_id: initialData.elpiji_id,
        pangkalan: initialData.pangkalan,
        pemilik: initialData.pemilik,
        nomor: initialData.nomor,
        alamat: initialData.alamat,
        nama_driver: initialData.nama_driver,
        tanggal: initialData.tanggal?.slice(0, 10),
        lpg_3kg: initialData.lpg_3kg,
        lpg_12kg: initialData.lpg_12kg,
      })
    }
  }, [initialData])

  const handleSelectElpiji = async (id) => {
    try {
      setLoading(true)

      if (!id) {
        setForm((prev) => ({
          ...prev,
          elpiji_id: '',
          pangkalan: '',
          pemilik: '',
          nomor: '',
          alamat: '',
          lpg_3kg: '',
          lpg_12kg: '',
        }))

        return
      }
      
      const res = await getElpijiById(id)
      const e = res.data.data

      setForm((prev) => ({
        ...prev,
        elpiji_id: e.id,
        pangkalan: e.pangkalan,
        pemilik: e.pemilik,
        nomor: e.nomor,
        alamat: e.alamat,
        lpg_3kg: e.elpiji_3kg,
        lpg_12kg: e.elpiji_12kg,
      }))
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message,
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...form,
        lpg_3kg: Number(form.lpg_3kg),
        lpg_12kg: Number(form.lpg_12kg),
      }

      if (initialData) {
        await updateTransaksi(initialData.id, payload)
      } else {
        await createTransaksi(payload)
      }

      onSuccess()
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal menyimpan transaksi",
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
        fixed inset-0 z-50
        bg-black/50
        px-4 py-10
        overflow-y-auto
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-xl
          bg-white rounded
          mx-auto
          shadow-[0_14px_0_0_rgba(22,163,74,0.45)]
          transform transition-all duration-300
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        <div className="bg-green-700 p-4 flex justify-between items-center rounded-t">
          <h2 className="text-lg font-bold text-white">
            {initialData ? "Edit Transaksi" : "Tambah Transaksi"}
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
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-4 p-4 border border-green-700/40"
        >
          {/* SELECT PANGKALAN */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pangkalan
            </label>

            <div className="flex gap-2">
              <select
                value={form.elpiji_id}
                onChange={(e) => handleSelectElpiji(e.target.value)}
                className="
                  flex-1 px-4 py-2 rounded-md
                  border border-slate-300 bg-white
                  focus:outline-none text-sm
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600 cursor-pointer
                "
              >
                <option value="">-- Pilih Pangkalan --</option>
                {elpijiList.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.pangkalan}
                  </option>
                ))}
              </select>

              {form.elpiji_id && (
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      elpiji_id: "",
                      pangkalan: "",
                      pemilik: "",
                      nomor: "",
                      alamat: "",
                      lpg_3kg: "",
                      lpg_12kg: "",
                    })
                  }
                  className="
                    p-2 text-sm font-semibold
                    bg-red-50 text-red-600
                    border border-red-600 rounded-md
                    hover:bg-red-100 transition cursor-pointer
                  "
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>
          </div>

          {/* Pemilik */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pemilik
            </label>
            <input
              name="pemilik"
              value={form.pemilik}
              onChange={handleChange}
              required
              placeholder="Nama Pemilik..."
              className="
                w-full px-4 py-2 rounded-md
                border border-slate-300
                focus:outline-none text-sm
                focus:ring-2 focus:ring-green-600/40
                focus:border-green-600
              "
            />
          </div>

          {/* NOMOR HP */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nomor HP
            </label>
            <input
              type="tel"
              name="nomor"
              value={form.nomor}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 15)
                setForm({ ...form, nomor: value })
              }}
              placeholder="08xxxxxxxxxx"
              maxLength={15}
              required
              className="
                w-full px-4 py-2 rounded-md
                border border-slate-300
                focus:outline-none text-sm
                focus:ring-2 focus:ring-green-600/40
                focus:border-green-600
              "
            />
          </div>

          {/* ALAMAT */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Alamat
            </label>
            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              placeholder="Jl..."
              required
              className="
                w-full px-4 py-2 rounded-md
                border border-slate-300
                focus:outline-none text-sm
                focus:ring-2 focus:ring-green-600/40
                focus:border-green-600
              "
            />
          </div>

          {/* DRIVER */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Driver
            </label>
            <input
              name="nama_driver"
              value={form.nama_driver}
              onChange={handleChange}
              placeholder="Nama Driver..."
              required
              className="
                w-full px-4 py-2 rounded-md
                border border-slate-300
                focus:outline-none text-sm
                focus:ring-2 focus:ring-green-600/40
                focus:border-green-600
              "
            />
          </div>

          {/* LPG */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                LPG 3 Kg
              </label>
              <input
                type="number"
                name="lpg_3kg"
                value={form.lpg_3kg}
                onChange={handleChange}
                min={0}
                required
                placeholder="9xx"
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
                LPG 12 Kg
              </label>
              <input
                type="number"
                name="lpg_12kg"
                value={form.lpg_12kg}
                onChange={handleChange}
                min={0}
                required
                placeholder="9xx"
                className="
                  w-full px-4 py-2 rounded-md
                  border border-slate-300
                  focus:outline-none
                  focus:ring-2 focus:ring-green-600/40
                  focus:border-green-600
                "
              />
            </div>
          </div>

          {/* TANGGAL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 rounded-md
                border border-slate-300
                focus:outline-none
                focus:ring-2 focus:ring-green-600/40
                focus:border-green-600
              "
            />
          </div>

          {/* ACTION */}
          <div className="flex gap-3 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="
                flex-1 px-4 py-2
                bg-gray-50 text-gray-700 font-semibold
                rounded-md border border-gray-700
                shadow-[0_6px_0_0_rgb(106,114,130)]
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgb(106,114,130)]
                active:translate-y-[6px]
                active:shadow-none
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

export default TransaksiFormModal
