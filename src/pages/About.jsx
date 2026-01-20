import MainLayout from "../layout/MainLayout"

function About() {
  return (
    <MainLayout>
      {/* ABOUT SECTION */}
      <section className="pt-12 pb-4 relative h-[530px] overflow-hidden" id="about">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3 px-8 md:px-12">
          Tentang PT. Cahya Patra Buana
        </h2>
        <div className="mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="font-body">

            <p className="text-slate-600 leading-relaxed mb-4 text-justify">
              PT. Cahya Patra Buana memiliki perjalanan yang panjang sebelum mencapai posisi seperti saat ini. Perusahaan ini awalnya berdiri pada tahun 2016 dengan nama CV. Sumber Gas Mandiri, yang bergerak di bidang distribusi gas LPG untuk wilayah Samarinda dan sekitarnya. Seiring berjalannya waktu, meningkatnya permintaan pasar dan kebutuhan untuk memberikan pelayanan yang lebih baik mendorong perusahaan melakukan transformasi. Pada tahun 2018, perusahaan berganti nama menjadi PT. Cahya Patra Buana, yang mencerminkan visi baru sebagai agen distribusi gas LPG yang lebih profesional dan terpercaya.
            </p>
            
          </div>

          {/* Image */}
          <div className="w-full h-[360px] rounded-md overflow-hidden shadow-md">
            <img
              src="/images/about.jpeg"
              alt="Tentang PT. Cahya Patra Buana"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* VISION & MISSION SECTION */}
    <section className="py-20 bg-slate-50" id="visimisi">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center">
        Visi & Misi PT. Cahya Patra Buana
      </h2>

      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Vision */}
        <div
          className="
            bg-white p-8 rounded-xl border border-green-700/40
            shadow-[0_8px_0_0_rgba(22,163,74,0.4)]
            transition-all duration-300 ease-out
            hover:translate-y-[2px]
            hover:shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
            active:translate-y-[6px]
            active:shadow-none cursor-pointer
          "
        >
          <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Visi
          </h3>
          <p className="text-slate-600 leading-relaxed text-justify">
            Menjadi agen LPG 3 kg terkemuka di Indonesia yang dipercaya masyarakat, menyediakan energi yang bersih, aman, dan terjangkau untuk masyarakat.
          </p>
        </div>

        {/* Mission */}
        <div
          className="
            bg-white p-8 rounded-xl border border-green-700/40
            shadow-[0_8px_0_0_rgba(22,163,74,0.4)]
            transition-all duration-300 ease-out
            hover:translate-y-[2px]
            hover:shadow-[0_4px_0_0_rgba(22,163,74,0.4)]
            active:translate-y-[6px]
            active:shadow-none cursor-pointer
          "
        >
          <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Misi
          </h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-3">
            <li>
              Menyediakan produk berkualitas
            </li>
            <li>
              Edukasi masyarakat
            </li>
            <li>
              Keterjangkauan harga
            </li>
            <li>
              Pengembangan sumber daya manusia
            </li>
            <li>
              Komitmen terhadap lingkungan
            </li>
          </ol>
        </div>

      </div>
    </section>


    {/* GALLERY SECTION */}
    <section className="py-20 bg-white" id="galeri">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 text-center">
          Galeri Kegiatan
        </h2>

        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-center">
          Dokumentasi kegiatan operasional dan distribusi LPG PT. Cahya Patra Buana
          dalam melayani pelanggan secara profesional dan aman.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                relative overflow-hidden rounded-xl border border-green-700/40
                shadow-[0_6px_0_0_rgba(22,163,74,0.4)]
                transition-all duration-300 ease-out
                hover:translate-y-[2px]
                hover:shadow-[0_3px_0_0_rgba(22,163,74,0.4)]
                active:translate-y-[5px]
                active:shadow-none
                group cursor-pointer
              "
            >
              {/* Image */}
              <img
                src={`/images/gallery-${item}.jpeg`}
                alt={`Kegiatan ${item}`}
                className="
                  w-full h-64 object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-green-900/30
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
              ></div>
            </div>
          ))}

        </div>
      </div>
    </section>

    </MainLayout>
  )
}

export default About
