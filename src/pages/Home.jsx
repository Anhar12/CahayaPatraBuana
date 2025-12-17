import MainLayout from "../layout/MainLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTruck,
  faIndustry,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons"

function Home() {
  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative h-[530px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/hero-bg.png"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          alt="Hero Background"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#36352b]/80 via-[#36352b]/60 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full md:w-[45%] px-8 md:px-12 font-body flex flex-col gap-5">

            <h1 className="text-3xl md:text-3xl font-bold text-white leading-tight">
              <span className="text-green-300"> Distribusi LPG Andal </span> untuk Kebutuhan Energi Anda
            </h1>

            <p className="text-green-200 italic font-semibold">
              Mendukung kelancaran pasokan gas LPG secara aman, tepat waktu, dan berkelanjutan
            </p>

            <p className="text-white/90 text-sm leading-relaxed text-justify">
              PT. Cahya Patra Buana merupakan perusahaan yang bergerak di bidang distribusi gas LPG,
              berkomitmen untuk menyediakan layanan penyaluran energi yang andal dan berkualitas.
              Dengan mengedepankan standar keselamatan, efisiensi distribusi, serta ketepatan waktu,
              kami hadir sebagai mitra terpercaya bagi industri, bisnis, dan masyarakat.
            </p>

            <div className="flex gap-4 mt-4">
              <a href="#services"
                className="
                  relative px-7 py-3 border border-green-700
                bg-green-50 text-green-700 font-semibold
                  rounded-md cursor-pointer
                  shadow-[0_6px_0_0_rgb(0,166,62)]
                  transition-all duration-300 ease-out
                  hover:translate-y-[2px]
                  hover:shadow-[0_3px_0_0_rgb(0,166,62)]
                  active:translate-y-[4px]
                  active:shadow-none
                "
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-8 text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
            Layanan Kami
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mb-12">
            PT. Cahya Patra Buana menyediakan layanan distribusi LPG yang aman,
            tepat waktu, dan terpercaya untuk berbagai kebutuhan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Service 1 */}
            <div
              className="
                bg-white p-8 rounded-xl cursor-pointer
                shadow-[0_8px_0_0_rgba(22,163,74,0.25)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.25)]
                active:translate-y-[6px]
                active:shadow-none border border-green-200
              "
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto flex items-center justify-center">
                <FontAwesomeIcon icon={faTruck} className="text-green-700 text-4xl" />
              </div>
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                Distribusi LPG Retail & UMKM
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                Menyediakan layanan distribusi LPG untuk kebutuhan rumah tangga dan
                usaha kecil dengan sistem pengiriman yang terjadwal dan aman.
              </p>
            </div>

            {/* Service 2 */}
            <div
              className="
                bg-white p-8 rounded-xl cursor-pointer
                shadow-[0_8px_0_0_rgba(22,163,74,0.25)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.25)]
                active:translate-y-[6px]
                active:shadow-none border border-green-200
              "
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto flex items-center justify-center">
                <FontAwesomeIcon icon={faIndustry} className="text-green-700 text-4xl" />
              </div>
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                Pasokan LPG Industri & Komersial
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                Melayani pasokan LPG untuk industri, restoran, dan sektor komersial
                dengan volume besar dan dukungan logistik profesional.
              </p>
            </div>

            {/* Service 3 */}
            <div
              className="
                bg-white p-8 rounded-xl cursor-pointer
                shadow-[0_8px_0_0_rgba(22,163,74,0.25)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.25)]
                active:translate-y-[6px]
                active:shadow-none border border-green-200
              "
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto flex items-center justify-center">
                <FontAwesomeIcon icon={faShieldHalved} className="text-green-700 text-4xl" />
              </div>
              <h3 className="font-semibold text-lg text-green-800 mb-2">
                Standar Keamanan & Kepatuhan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                Seluruh proses distribusi dilakukan sesuai standar keselamatan dan
                regulasi, didukung oleh tenaga terlatih dan armada terawat.
              </p>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
