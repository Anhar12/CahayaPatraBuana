import { apiFetch } from "./api"

export function getElpiji({ page = 1, limit = 10, search = "" }) {
  const params = new URLSearchParams({ page, limit, search })
  return apiFetch(`/api/elpiji?${params.toString()}`)
}

export function createElpiji(data) {
  return apiFetch("/api/elpiji", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateElpiji(id, data) {
  return apiFetch(`/api/elpiji/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteElpiji(id) {
  return apiFetch(`/api/elpiji/${id}`, {
    method: "DELETE",
  })
}
