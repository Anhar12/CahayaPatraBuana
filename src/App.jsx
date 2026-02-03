import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Pangkalan from "./pages/Admin/Pangkalan"
import Transaksi from "./pages/Admin/Transaksi"
import Storage from "./pages/Admin/Storage"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/pangkalan"
          element={
            <ProtectedRoute>
              <Pangkalan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transaksi"
          element={
            <ProtectedRoute>
              <Transaksi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/storage"
          element={
            <ProtectedRoute>
              <Storage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
