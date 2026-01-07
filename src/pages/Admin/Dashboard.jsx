import AdminLayout from "../../layout/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTruck,
  faIndustry,
  faGasPump,
  faPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import DataTable from "../../components/Admin/DataTable"

function Dashboard() {
  const handleTambah = () => {
    Swal.fire({
      icon: "info",
      title: "Tambah",
      text: "Button Tambah diklik",
      confirmButtonColor: "#016630",
    })
  }

  const columnDefs = [
    { headerName: "ID", field: "id", width: 80, filter: true },
    { headerName: "Pangkalan", field: "pangkalan", flex: 1, filter: true },
    { headerName: "Pemilik", field: "pemilik", flex: 1, filter: true },
    { headerName: "Phone", field: "phone", flex: 1, filter: true },
    { headerName: "Alamat", field: "alamat", flex: 2, filter: true },
    { headerName: "3 Kg", field: "kg3", width: 90, filter: true },
    { headerName: "12 Kg", field: "kg12", width: 90, filter: true },
    {
      headerName: "Aksi",
      width: 120,
      cellRenderer: () => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Edit",
                text: "Edit diklik",
                confirmButtonColor: "#016630",
              })
            }
            className="text-green-700"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>

          <button
            onClick={() =>
              Swal.fire({
                icon: "warning",
                title: "Hapus",
                text: "Hapus diklik",
                confirmButtonColor: "#016630",
              })
            }
            className="text-red-600"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ]

  const rowData = [
    {
      id: 1,
      pangkalan: "Lorem",
      pemilik: "Ipsum",
      phone: "0877777777",
      alamat: "Jl. Lorem Ipsum",
      kg3: 40,
      kg12: 12,
    },
    {
      id: 2,
      pangkalan: "Dolor Sit",
      pemilik: "Amet",
      phone: "0877777777",
      alamat: "Jl. Dolot Sit Amet",
      kg3: 40,
      kg12: 12,
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* STAT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard icon={faTruck} label="Jumlah Truck" value="12" />
          <StatCard icon={faIndustry} label="Jumlah Pickup" value="8" />
          <StatCard icon={faGasPump} label="Elpiji 3 Kg" value="1.240" />
          <StatCard icon={faGasPump} label="Elpiji 12 Kg" value="680" />
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-green-800">
              Data Pangkalan Elpiji
            </h2>

            <button
              onClick={handleTambah}
              className="
                flex items-center gap-2
                px-4 py-2 bg-green-50 text-green-700 font-semibold
                rounded-md border border-green-700
                shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
                hover:translate-y-[2px]
                hover:shadow-[0_2px_0_0_rgba(22,163,74,0.4)]
                active:translate-y-[4px]
                active:shadow-none
              "
            >
              <FontAwesomeIcon icon={faPlus} />
              Tambah
            </button>
          </div>

          <DataTable
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

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
