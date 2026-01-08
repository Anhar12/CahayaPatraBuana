import { useState, useEffect } from "react"
import { useSearchParams } from 'react-router-dom';
import AdminLayout from "../../layout/AdminLayout"
import ElpijiFormModal from "../../components/Admin/ElpijiFormModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTruck,
  faIndustry,
  faGasPump,
  faPlus,
  faPenToSquare,
  faTrash,
  faSearch,
  faFireFlameSimple,
  faTruckPickup,
  faFire
} from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import DataTable from "../../components/Admin/DataTable"
import { getElpiji, deleteElpiji } from "../../services/elpijiService"
import { getDashboardStats } from "../../services/dashboardService"
import LoadingOverlay from "../../components/LoadingOverlay"

function Dashboard() {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowData, setRowData] = useState([])
  const [dashboardData, setDashboardData] = useState({
    total_3kg: 0,
    total_12kg: 0,
    truck: 0,
    pickup: 0,
  })
  const [selectedRow, setSelectedRow] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""
  const [searchInput, setSearchInput] = useState(searchQuery)

  // get data elpiji
  const fetchData = async () => {
    setLoading(true)
    
    try {
      const [elpijiRes, dashboardRes] = await Promise.all([
        getElpiji({ search: searchQuery }),
        getDashboardStats(),
      ])

      setRowData(elpijiRes.data.data)
      setDashboardData(dashboardRes.data)
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

  // toggle button show add modal
  const handleTambah = () => {
    setShowModal(true)
  }

  // hadle delete data elpiji
  const handleDelete = async (row) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Hapus data?",
      text: `Data pangkalan "${row.pangkalan}" akan dihapus permanen`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    })

    if (!result.isConfirmed) return

    try {
      setLoading(true)
      await deleteElpiji(row.id)
      await fetchData()

      Swal.fire({
        icon: "success",
        title: "Dihapus",
        text: "Data berhasil dihapus",
        confirmButtonColor: "#016630",
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus",
        text: err.message || "Terjadi kesalahan",
        confirmButtonColor: "#016630",
      })
    } finally {
      setLoading(false)
    }
  }

  // startup event, fetch data elpiji
  useEffect(() => {
    fetchData()
  }, [searchQuery])

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        setSearchParams({ q: searchInput })
      } else {
        setSearchParams({})
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [searchInput])
  
  // data table column definitions
  const columnDefs = [
    {
      headerName: "No.",
      width: 50,
      filter: false,
      suppressMenu: true,
      sortable: false,
      valueGetter: (params) => params.node.rowIndex + 1,
      cellClass: "ag-cell-center ag-cell-center-text",
    },
    {
      headerName: "",
      width: 70,
      filter: false,
      suppressMenu: true,
      sortable: false,
      cellRenderer: (params) => (
        // action edit button
        <div className="flex gap-2 justify-center w-full">
          <button
            onClick={() => {
              setSelectedRow(params.data)
              setShowModal(true)
            }}
            className="text-yellow-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          
          {/* action delete button */}
          <button
            onClick={() => handleDelete(params.data)}
            className="text-red-600 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },

    { headerName: "Pangkalan", field: "pangkalan", minWidth: 180 },
    { headerName: "Pemilik", field: "pemilik", minWidth: 160 },
    { headerName: "Phone", field: "nomor", minWidth: 150 },
    { headerName: "Alamat", field: "alamat", minWidth: 300, flex: 1 },
    { headerName: "LPG 3 Kg", field: "elpiji_3kg", minWidth: 100 },
    { headerName: "LPG 12 Kg", field: "elpiji_12kg", minWidth: 100 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* dashboard cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={faTruck}
            label="Jumlah Truck"
            value={dashboardData.truck}
          />

          <StatCard
            icon={faTruckPickup}
            label="Jumlah Pickup"
            value={dashboardData.pickup}
          />

          <StatCard
            icon={faFireFlameSimple}
            label="Elpiji 3 Kg"
            value={dashboardData.total_3kg}
          />

          <StatCard
            icon={faFire}
            label="Elpiji 12 Kg"
            value={dashboardData.total_12kg}
          />
        </div>

        {/* data table elpiji */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="md:text-xl font-bold text-green-800 text-center mb-6">
            Data Pangkalan Elpiji
          </h2>

          <div className="flex items-center justify-between mb-4">
            {/* searching */}
            <div className="md:max-w-1/3 max-w-[60%] w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchInput) {
                    setSearchParams({ q: searchInput })
                  } else {
                    setSearchParams({})
                  }
                }}
                className="w-full md:max-w-sm relative"
              >
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari data..."
                  className="w-full pr-10 pl-4 py-2 rounded-md border border-slate-300 text-xs md:text-sm
                            focus:outline-none focus:ring-2 focus:ring-green-600/40"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
            
            {/* add button */}
            <button
              onClick={handleTambah}
              className="
                flex items-center gap-2 cursor-pointer
                px-4 py-2 text-sm md:text-md
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

          {/* data table */}
          <DataTable
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>
      </div>

      {/* modal form add/edit elpiji */}
      {showModal && (
        <ElpijiFormModal
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
                ? "Data berhasil diperbarui"
                : "Data berhasil ditambahkan",
              confirmButtonColor: "#016630",
            })
          }}
        />
      )}

      {/* loading animation */}
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

export default Dashboard