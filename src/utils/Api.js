import firebaseApp from "./firebase";
import firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uid) {
  return await db.collection("admins").doc(uid).get();
}

export const reauthenticate = (password) => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );

  return user.reauthenticateAndRetrieveDataWithCredential(credentials);
};
