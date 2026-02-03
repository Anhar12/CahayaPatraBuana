import { apiFetch } from "./api"

export function getTransaksi({ search = "" } = {}) {
  const params = new URLSearchParams()
  if (search) params.append("search", search)

  return apiFetch(`/api/transaksi?${params.toString()}`)
}

export function getElpijiById(elpijiId) {
  return apiFetch(`/api/transaksi/elpiji/${elpijiId}`)
}

export function createTransaksi(data) {
  return apiFetch("/api/transaksi", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateTransaksi(id, data) {
  return apiFetch(`/api/transaksi/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function completeTransaksi(id) {
  return apiFetch(`/api/transaksi/${id}/complete`, {
    method: "PUT",
  })
}

export function deleteTransaksi(id) {
  return apiFetch(`/api/transaksi/${id}`, {
    method: "DELETE",
  })
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function exportTransaksi({ search = "" } = {}) {
  const params = new URLSearchParams()
  if (search) params.append("search", search)

  const token = localStorage.getItem("token") // sesuaikan

  const res = await fetch(
    `${API_BASE_URL}/api/transaksi/export?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Gagal export data")
  }

  const blob = await res.blob()

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "transaksi.xlsx"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}