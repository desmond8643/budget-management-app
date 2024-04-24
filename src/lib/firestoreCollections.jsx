import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const weeklyCollectionRef = collection(db, 'weekly')
export const usersCollectionRef = collection(db, 'users')
export const emojisCollectionRef = collection(db, 'emojis')