import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import LoadingOverlay from "../LoadingOverlay"
import { updateStorage } from "../../services/storageService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function StorageFormModal({ initialData, onClose, onSuccess }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [jumlah, setJumlah] = useState(initialData?.jumlah ?? 0)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = "")
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (jumlah < 0) {
        throw new Error("Jumlah tidak boleh negatif")
      }

      await updateStorage(initialData.id, Number(jumlah))
      onSuccess()
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

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 bg-black/50 px-4 py-10 overflow-y-auto
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md bg-white rounded mx-auto
          shadow-[0_14px_0_0_rgba(22,163,74,0.45)]
          transform transition-all duration-300
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
      >
        <div className="bg-green-700 p-4 flex justify-between items-center rounded-t">
          <h2 className="text-lg font-bold text-white">
            Edit Jumlah Storage
          </h2>

          <button
            onClick={handleClose}
            className="text-white text-xl font-bold opacity-80 hover:opacity-100"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border border-green-700/40"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama
            </label>
            <input
              value={initialData.nama}
              disabled
              className="w-full px-4 py-2 rounded-md border bg-slate-100 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Jumlah
            </label>
            <input
              type="number"
              min={0}
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
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
                transition-all
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
                transition-all
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

export default StorageFormModal
