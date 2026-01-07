import { apiFetch } from "./api"

export function login(username, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
}

export async function checkAuth() {
  return await apiFetch("/auth/me")
}
