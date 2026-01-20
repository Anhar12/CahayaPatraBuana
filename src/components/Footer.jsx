import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faGithub
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

function Footer() {
  const iconStyle = "transition bg-green-800 border border-white text-white py-[6px] px-[8px] rounded-full hover:bg-white hover:text-green-800"

  return (
    <footer className="bg-green-800 text-gray-100 pt-6 pb-4 font-heading">
      <div className="mx-auto md:px-12 px-8 grid grid-cols-2 md:grid-cols-4 md:gap-20 gap-10">

        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src="/images/logo.png"
            className="w-40 h-4w-40 object-contain"
            alt="Company Logo"
          />
        </div>

        {/* Home */}
        <div>
          <h3 className="font-bold text-lg mb-3">Home</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/#hero" className="hover:underline transition">Beranda</a></li>
            <li><a href="/#services" className="hover:underline transition">Layanan</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-3">About</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/about#about" className="hover:underline transition">Tentang Kami</a></li>
            <li><a href="/about#visimisi" className="hover:underline transition">Visi & Misi</a></li>
            <li><a href="/about#galeri" className="hover:underline transition">Galeri Kegiatan</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/contact#contact" className="hover:underline transition">Hubungi Kami</a></li>
            <li><a href="/contact#lokasi" className="hover:underline transition">Lokasi</a></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white my-4 mx-6 md:mx-12"></div>

      {/* Bottom Section */}
      <div className="mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-md text-white">
          © {new Date().getFullYear()} PT. Cahya Patra Buana. All rights reserved.
        </p>

        <div className="flex gap-4">
          <a href="wa.me/6282255695790" className={iconStyle}><FontAwesomeIcon icon={faWhatsapp}/></a>
          <a href="mailto:cahyapatrabuana@gmail.com" className={iconStyle}><FontAwesomeIcon icon={faEnvelope}/></a>
          <a href="/" className={iconStyle}><FontAwesomeIcon icon={faInstagram}/></a>
          <a href="/" className={iconStyle}><FontAwesomeIcon icon={faLinkedinIn}/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
