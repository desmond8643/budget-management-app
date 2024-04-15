import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import * as ROUTES from "./routes"
import React from "react"
import Login from "./Login"
import Dashboard from "./Dashboard/Dashboard"
import Register from "./Register"
import Budget from "./Budget/Budget"

import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.BUDGET} element={<Budget />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
