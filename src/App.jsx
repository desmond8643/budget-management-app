import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import * as ROUTES from "./routes"
import React, { useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard/Dashboard"
import Register from "./Register"
import Budget from "./Budget/Budget"
import FirebaseContext from "./context/firebase"
import { firebase, FieldValue } from "./lib/firebase"
import useAuthListener from "./hooks/use-auth-listener"

import "./index.css"
import IsUserLoggedIn from "./helper/is-user-logged-in"
import ProtectedRoute from "./helper/protected-route"
import NotFound from "./NotFound"

function App() {
  const { user } = useAuthListener()

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<IsUserLoggedIn user={user} />}>
          <Route path={ROUTES.LOGIN} element={<Login theme={theme} />} />
          <Route path={ROUTES.REGISTER} element={<Register theme={theme} />} />
        </Route>
        <Route element={<ProtectedRoute user={user} />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <Dashboard theme={theme} setTheme={setTheme} user={user} />
            }
          />
          <Route>
            <Route path="/budget/:id" element={<Budget theme={theme} />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound theme={theme} />} />
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
