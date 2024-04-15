import React from "react"

export default function DeleteModal({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        style={{ padding: "0px" }}
        className="absolute bg-white p-4 rounded-2xl shadow-lg w-80"
      >
        <div className="mt-3">
          <h2 className="font-semibold text-2xl text-center">
            Delete Budget 1?
          </h2>
          <div className="mb-7 mt-7">
            <div className="flex justify-center">
              <button className="text-white rounded-2xl py-1 px-4 bg-buttonRed">
                Delete
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="rounded-2xl py-1 px-4 border border-black"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
