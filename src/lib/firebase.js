// Import the functions you need from the SDKs you need
import Firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP16NnhBMe0JlwKkt0EPpQgXwIJEaElk8",
  authDomain: "budget-5b958.firebaseapp.com",
  projectId: "budget-5b958",
  storageBucket: "budget-5b958.appspot.com",
  messagingSenderId: "4793789676",
  appId: "1:4793789676:web:64af7848438bf219c5c9c9",
}

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
