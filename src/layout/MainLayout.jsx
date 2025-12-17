import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto min-h-screen relative">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
