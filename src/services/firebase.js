import { firebase, FieldValue } from "../lib/firebase"

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get()

  return result.docs.map((user) => user.data().length > 0)
}

export async function getUserBudgetByUsername(username) {
  const [user] = await getUserByUsername(username)
  console.log(user)
  const result = await firebase
    .firestore()
    .collection("weekly")
    .where("userId", "==", user.userId)
    .get()
    

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get()

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
}
