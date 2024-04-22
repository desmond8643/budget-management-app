import React from "react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl mb-5">404</h1>
        <h1 className="mb-5 text-3xl">Page Not Found</h1>
        <Link to="/"><p style={{textDecoration:'underline'}}>Home Page</p></Link>
      </div>
    </div>
  )
}
