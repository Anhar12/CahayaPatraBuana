import { useEffect, useState } from "react"
import AdminLayout from "../../layout/AdminLayout"
import DataTable from "../../components/Admin/DataTable"
import LoadingOverlay from "../../components/LoadingOverlay"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { getStorage } from "../../services/storageService"
import StorageFormModal from "../../components/Admin/StorageFormModal"

function Storage() {
  const [loading, setLoading] = useState(false)
  const [rowData, setRowData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getStorage()
      setRowData(res.data.data)
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

  useEffect(() => {
    fetchData()
  }, [])

  const columnDefs = [
    {
      headerName: "No.",
      width: 60,
      valueGetter: (p) => p.node.rowIndex + 1,
      filter: false,
    },
    {
      headerName: "",
      width: 80,
      filter: false,
      cellRenderer: (params) => (
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
        </div>
      ),
    },
    { headerName: "Nama", field: "nama", minWidth: 180, flex: 1 },
    { headerName: "Jumlah", field: "jumlah", minWidth: 120, flex: 1 },
  ]

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="md:text-xl font-bold text-green-800 text-center mb-6">
          Data Storage
        </h2>

        <DataTable rowData={rowData} columnDefs={columnDefs} />
      </div>

      {showModal && (
        <StorageFormModal
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
              text: "Jumlah storage berhasil diperbarui",
              confirmButtonColor: "#016630",
            })
          }}
        />
      )}

      <LoadingOverlay show={loading} />
    </AdminLayout>
  )
}

export default Storage
