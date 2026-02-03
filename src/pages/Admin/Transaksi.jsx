import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import AdminLayout from "../../layout/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faSearch,
  faTruck,
  faTruckPickup,
  faFireFlameSimple,
  faFire,
  faCheck,
  faFileExport
} from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import DataTable from "../../components/Admin/DataTable"
import LoadingOverlay from "../../components/LoadingOverlay"
import {
  getTransaksi,
  deleteTransaksi,
  completeTransaksi,
  exportTransaksi
} from "../../services/transaksiService"
import { getStorage } from "../../services/storageService"
import TransaksiFormModal from "../../components/Admin/TransaksiFormModal"

function Transaksi() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowData, setRowData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""
  const [searchInput, setSearchInput] = useState(searchQuery)

  const [dashboardData, setDashboardData] = useState({
    truck: 0,
    pickup: 0,
    total_3kg: 0,
    total_12kg: 0,
  })

  const fetchData = async () => {
    setLoading(true)

    try {
      const [transaksiRes, storageRes] = await Promise.all([
        getTransaksi({ search: searchQuery }),
        getStorage(),
      ])

      // data table transaksi
      setRowData(transaksiRes.data.data)

      // dashboard storage
      const rows = storageRes.data.data

      const mapped = {
        truck: 0,
        pickup: 0,
        total_3kg: 0,
        total_12kg: 0,
      }

      rows.forEach((r) => {
        if (r.nama === "Truck") mapped.truck = r.jumlah ?? 0
        if (r.nama === "Pick Up") mapped.pickup = r.jumlah ?? 0
        if (r.nama === "LPG 3kg") mapped.total_3kg = r.jumlah ?? 0
        if (r.nama === "LPG 12kg") mapped.total_12kg = r.jumlah ?? 0
      })

      setDashboardData(mapped)
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: err.message,
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      setLoading(true)
      await exportTransaksi({ search: searchQuery })

      Swal.fire({
        icon: "success",
        title: "Dihapus",
        text: "Berhasil export data transaksi.",
        confirmButtonColor: "#016630",
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal export data transaksi.",
        text: err.message,
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (row) => {
    if (row.status === "Completed") {
      return Swal.fire({
        icon: "warning",
        title: "Tidak bisa dihapus",
        text: "Transaksi yang sudah selesai tidak dapat dihapus",
        confirmButtonColor: "#016630",
      })
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus transaksi?",
      text: `Transaksi driver "${row.nama_driver}" akan dihapus`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    })

    if (!result.isConfirmed) return

    try {
      setLoading(true)
      await deleteTransaksi(row.id)
      await fetchData()

      Swal.fire({
        icon: "success",
        title: "Dihapus",
        text: "Transaksi berhasil dihapus",
        confirmButtonColor: "#016630",
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: err.message,
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (row) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Selesaikan transaksi?",
      text: "Status transaksi akan menjadi Completed",
      showCancelButton: true,
      confirmButtonText: "Ya, selesaikan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
    })

    if (!result.isConfirmed) return

    try {
      setLoading(true)
      await completeTransaksi(row.id)
      await fetchData()

      Swal.fire({
        icon: "success",
        title: "Selesai",
        text: "Transaksi berhasil diselesaikan",
        confirmButtonColor: "#016630",
      })
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

  useEffect(() => {
    fetchData()
  }, [searchQuery])

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) setSearchParams({ q: searchInput })
      else setSearchParams({})
    }, 600)

    return () => clearTimeout(timer)
  }, [searchInput])

  const columnDefs = [
    {
      headerName: "No.",
      width: 60,
      valueGetter: (params) => params.node.rowIndex + 1,
      filter: false
    },
    {
      headerName: "",
      width: 110,
      filter: false,
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center w-full">
          {params.data.status === "Waiting" && (
            <>
              <button
                onClick={() => handleComplete(params.data)}
                className="text-green-600 cursor-pointer"
                title="Selesaikan"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>

              <button
                onClick={() => {
                  setSelectedRow(params.data)
                  setShowModal(true)
                }}
                className="text-yellow-500 cursor-pointer"
                >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>

              <button
                onClick={() => handleDelete(params.data)}
                className="text-red-600 cursor-pointer"
                >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}

          {params.data.status === "Completed" && (
            <>
              <button
                onClick={() => handleDelete(params.data)}
                className="text-red-600 cursor-pointer"
                >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      ),
    },
    { headerName: "Status", field: "status", minWidth: 120 },
    {
      headerName: "Tanggal",
      field: "tanggal",
      minWidth: 120,
      valueFormatter: (params) => {
        if (!params.value) return ""
        const [y, m, d] = params.value.slice(0, 10).split("-")
        return `${d}/${m}/${y}`
      },
    },
    { headerName: "Pangkalan", field: "pangkalan", minWidth: 160 },
    { headerName: "Driver", field: "nama_driver", minWidth: 150 },
    { headerName: "LPG 3 Kg", field: "lpg_3kg", minWidth: 100 },
    { headerName: "LPG 12 Kg", field: "lpg_12kg", minWidth: 110 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={faTruck} label="Jumlah Truck" value={dashboardData.truck} />
          <StatCard icon={faTruckPickup} label="Jumlah Pickup" value={dashboardData.pickup} />
          <StatCard icon={faFireFlameSimple} label="Elpiji 3 Kg" value={dashboardData.total_3kg} />
          <StatCard icon={faFire} label="Elpiji 12 Kg" value={dashboardData.total_12kg} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="md:text-xl font-bold text-green-800 text-center mb-6">
            Data Transaksi
          </h2>

          {/* SEARCH + ADD */}
          <div className="flex items-center justify-between mb-4">
            <form className="relative md:max-w-sm w-full">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari transaksi..."
                className="w-full pr-10 pl-4 py-2 rounded-md border border-slate-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-green-600/40"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <div className="flex gap-5">
              <button
                onClick={handleExport}
                className="
                  flex items-center gap-2
                  px-4 py-2 text-sm
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
                <FontAwesomeIcon icon={faFileExport} />
                Export
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="
                  flex items-center gap-2
                  px-4 py-2 text-sm cursor-pointer
                  bg-green-50 text-green-700 font-semibold
                  rounded-md border border-green-700
                  shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
                  hover:translate-y-[2px]
                  hover:shadow-[0_2px_0_0_rgba(22,163,74,0.4)]
                  active:translate-y-[4px]
                  active:shadow-none transition-all
                "
              >
                <FontAwesomeIcon icon={faPlus} />
                Tambah
              </button>
            </div>
          </div>

          <DataTable rowData={rowData} columnDefs={columnDefs} />
        </div>
      </div>

      {showModal && (
        <TransaksiFormModal
          initialData={selectedRow}
          onClose={() => {
            setShowModal(false)
            setSelectedRow(null)
          }}
          onSuccess={async () => {
            await fetchData()
            setShowModal(false)
            setSelectedRow(null)

            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: selectedRow
                ? "Transaksi berhasil diperbarui"
                : "Transaksi berhasil ditambahkan",
              confirmButtonColor: "#016630",
            })
          }}
        />
      )}

      <LoadingOverlay show={loading} />
    </AdminLayout>
  )
}

// stat card component
function StatCard({ icon, label, value }) {
  return (
    <div
      className="
        bg-white p-6 rounded-xl text-center
        border border-green-700/40
        shadow-[0_6px_0_0_rgba(22,163,74,0.35)]
        transition-all cursor-pointer
        hover:translate-y-[2px]
        hover:shadow-[0_3px_0_0_rgba(22,163,74,0.35)]
      "
    >
      <FontAwesomeIcon icon={icon} className="text-green-700 text-3xl mb-2" />
      <p className="text-slate-600 text-sm">{label}</p>
      <p className="text-xl font-bold text-green-800">{value}</p>
    </div>
  )
}

export default Transaksi
