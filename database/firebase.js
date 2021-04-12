import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAXannT3qYVle_g71G0lk8T7Nmz_TAU1U0",
    authDomain: "crud-react-native-ca93a.firebaseapp.com",
    projectId: "crud-react-native-ca93a",
    storageBucket: "crud-react-native-ca93a.appspot.com",
    messagingSenderId: "731645815222",
    appId: "1:731645815222:web:21bfea15793039b2747917"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

export default {
  firebase,
  db
}