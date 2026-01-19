// src/lib/auth.ts
export const saveAuth = (data: any) => {
  localStorage.setItem("access_token", data.accessToken)
  localStorage.setItem("refresh_token", data.refreshToken)
  localStorage.setItem("user_role", data.role)
}

export const logout = () => {
  localStorage.clear()
  window.location.href = "/admin/login"
}

export const isAdmin = () => {
  return localStorage.getItem("user_role") === "ADMIN"
}
