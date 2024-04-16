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
import Register from "./Register/Register"
import Budget from "./Budget/Budget"
import FirebaseContext from "./context/firebase"
import { firebase, FieldValue } from "./lib/firebase"
import UserContext from "./context/user"
import useAuthListener from "./hooks/use-auth-listener"

import "./index.css"

function App() {
  const { user } = useAuthListener()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard user={user} />} />
        <Route path={ROUTES.BUDGET} element={<Budget />} />
      </Route>
    )
  )

  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <RouterProvider router={router} />
    </FirebaseContext.Provider>
  )
}

export default App
