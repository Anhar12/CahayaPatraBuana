import { apiFetch } from "./api"

export function getStorage() {
  return apiFetch("/api/storage")
}

export function updateStorage(id, jumlah) {
  return apiFetch(`/api/storage/${id}`, {
    method: "PUT",
    body: JSON.stringify({ jumlah }),
  })
}
