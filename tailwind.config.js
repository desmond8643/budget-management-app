/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/Login.jsx", "./src/Modal.jsx", "./src/Register.jsx", "./src/Dashboard/Dashboard.jsx", './src/Dashboard/RenameModal.jsx', "./src/Dashboard/editModal.jsx", "./src/Dashboard/DeleteModal.jsx", "./src/Dashboard/AddModal.jsx", "./src/Budget/Budget.jsx", './src/Dashboard/UserModal.jsx'],
  theme: {
    extend: {
      colors: {
        buttonBlue: "#0CC0DF",
        buttonRed: '#FF5757',
        buttonBlueDark: '#0F4C75',
        backgroundDark: '#2A2438',
        foregroundDark: '#352F44'
      }
    },
  },
  plugins: [],
}
