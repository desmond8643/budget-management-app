import React from "react"

export default function EditModal({
  setRenameModalOpen,
  setDeleteModalOpen,
  open,
  onClose,
  currentEditModal,
  budgets,
}) {
  const findObject = budgets.find((budget) => budget.docId === currentEditModal)
  
  const title = findObject && findObject.title

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
          <h2 className="font-semibold text-2xl text-center">{title}</h2>
          <div className="mb-5 mt-3">
            <h2
              className="cursor-pointer text-2xl text-center w-auto border-t pt-1 pb-1"
              onClick={() => {
                setRenameModalOpen(true)
                onClose()
              }}
            >
              Rename
            </h2>
            <h2
              className="cursor-pointer pt-1 pb-1 font-semibold text-2xl text-center border-t border-b text-red-500"
              onClick={() => {
                setDeleteModalOpen(true)
                onClose()
              }}
            >
              Delete
            </h2>
            <h2
              className="cursor-pointer pt-1 text-2xl text-center"
              onClick={onClose}
            >
              Cancel
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
