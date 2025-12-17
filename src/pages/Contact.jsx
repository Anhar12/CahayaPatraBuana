import MainLayout from "../layout/MainLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"

function Contact() {
  return (
    <MainLayout>

      {/* CONTACT INFO SECTION */}
      <section className="py-20 bg-slate-50" id="contact">
        <div className="max-w-6xl mx-auto px-8">

          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 text-center">
            Hubungi Kami
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-center">
            Untuk informasi lebih lanjut mengenai layanan distribusi LPG,
            silakan hubungi PT. Cahya Patra Buana melalui kontak berikut.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Phone */}
            <div
              className="
                bg-white p-8 rounded-xl text-center border border-green-700/40
                shadow-[0_8px_0_0_rgba(22,163,74,0.4)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
                active:translate-y-[6px]
                active:shadow-none cursor-pointer
              "
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faPhone} className="text-green-700 text-xl" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Telepon
              </h3>
              <p className="text-slate-600 text-sm">
                (021) 1234 5678
              </p>
            </div>

            {/* Email */}
            <div
              className="
                bg-white p-8 rounded-xl text-center border border-green-700/40
                shadow-[0_8px_0_0_rgba(22,163,74,0.4)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
                active:translate-y-[6px]
                active:shadow-none cursor-pointer
              "
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-700 text-xl" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Email
              </h3>
              <p className="text-slate-600 text-sm">
                info@cahyapatrabuana.co.id
              </p>
            </div>

            {/* Address */}
            <div
              className="
                bg-white p-8 rounded-xl text-center border border-green-700/40
                shadow-[0_8px_0_0_rgba(22,163,74,0.4)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
                active:translate-y-[6px]
                active:shadow-none cursor-pointer
              "
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faLocationDot} className="text-green-700 text-xl" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Alamat
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Jl. Contoh Alamat No. 123<br />
                Kota, Provinsi, Indonesia
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20 bg-white" id="lokasi">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">
            Lokasi Kami
          </h2>

          <div className="w-full h-[400px] rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7979.330334952818!2d117.11676801001596!3d-0.5020246298434066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1765967254545!5m2!1sid!2sid"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </MainLayout>
  )
}

export default Contact
