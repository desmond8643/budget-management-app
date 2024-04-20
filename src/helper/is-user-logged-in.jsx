import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import * as ROUTES from "../routes"

export default function IsUserLoggedIn({ user }) {
  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} />
  }
  return <Outlet />
}
