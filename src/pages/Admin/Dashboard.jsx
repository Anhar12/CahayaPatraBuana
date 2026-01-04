import AdminLayout from "../../layout/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faTruck,
  faIndustry,
  faGasPump,
  faRightFromBracket,
  faPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"

function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex-1 flex flex-col">
        <main className="p-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <StatCard
              icon={faTruck}
              label="Jumlah Truck"
              value="12"
            />

            <StatCard
              icon={faIndustry}
              label="Jumlah Pickup"
              value="8"
            />

            <StatCard
              icon={faGasPump}
              label="Elpiji 3 Kg"
              value="1.240"
            />

            <StatCard
              icon={faGasPump}
              label="Elpiji 12 Kg"
              value="680"
            />

          </div>

          <div
            className="
              bg-white p-6 rounded-xl
              border border-slate-200
              shadow-sm
            "
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-green-800">
                Data Pangkalan Elpiji
              </h2>

              <button
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

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border px-3 py-2">ID</th>
                    <th className="border px-3 py-2">Pangkalan</th>
                    <th className="border px-3 py-2">Pemilik</th>
                    <th className="border px-3 py-2">Phone</th>
                    <th className="border px-3 py-2">Alamat</th>
                    <th className="border px-3 py-2">3 Kg</th>
                    <th className="border px-3 py-2">12 Kg</th>
                    <th className="border px-3 py-2">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="hover:bg-slate-50">
                    <td className="border px-3 py-2 text-center">1</td>
                    <td className="border px-3 py-2">Lorem</td>
                    <td className="border px-3 py-2">Ipsum</td>
                    <td className="border px-3 py-2">0877777777</td>
                    <td className="border px-3 py-2">Jl. Lorem Ipsum</td>
                    <td className="border px-3 py-2 text-center">40</td>
                    <td className="border px-3 py-2 text-center">12</td>
                    <td className="border px-3 py-2">
                      <div className="flex gap-2 justify-center">
                        <button className="text-green-700">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="text-red-600">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>
          </div>

        </main>
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
        transition-all
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
