import React from "react"

export default function AddModal({ open, onClose, children }) {
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
          <h2 className="font-semibold text-2xl text-center">Add Budget List</h2>
          <div className="mb-5 mt-7">
            <div className="flex justify-center mb-2">
              <input type="text" className="w-52 border border-black" />
            </div>
            <h3 className="text-center text-red-500 font-semibold">Please Type Something</h3>
            <div className="flex justify-center mt-3 gap-7">
              <button className="rounded-2xl py-1 px-6 bg-buttonBlue">
                Add
              </button>
              <button
                className="rounded-2xl py-1 px-5 bg-buttonRed"
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
