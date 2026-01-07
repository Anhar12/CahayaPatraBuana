const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "API Error")
  }

  return data
}
