import React from "react"

export default function SelectEmojiModal({
  open,
  onClose,
  theme,
  filteredEmojis,
  setSelectedEmoji,
}) {
  const emojiElements = filteredEmojis.map((emoji) => {
    return (
      <h2
        className="flex justify-center cursor-pointer text-4xl"
        onClick={() => {
          setSelectedEmoji(emoji)
          onClose()
        }}
      >
        {emoji}
      </h2>
    )
  })
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
        className={`absolute ${
          theme === "dark" ? "bg-foregroundDark" : "bg-white"
        } p-4 pt-5 pb-7 rounded-2xl shadow-lg w-80`}
      >
        <div className="grid grid-cols-4 gap-y-6">{emojiElements}</div>
      </div>
    </div>
  )
}
