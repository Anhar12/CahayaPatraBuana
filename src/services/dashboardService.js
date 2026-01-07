import { apiFetch } from "./api"

export function getDashboardStats() {
  return apiFetch("/api/dashboard/stats")
}
