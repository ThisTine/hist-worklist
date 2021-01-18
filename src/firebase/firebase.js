import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
firebase.initializeApp({
    apiKey: "YOUR-FIREBASE-KEY",
    authDomain: "YOUR-FIREBASE-KEY",
    projectId: "YOUR-FIREBASE-KEY",
    storageBucket: "YOUR-FIREBASE-KEY",
    messagingSenderId: "YOUR-FIREBASE-KEY",
    appId: "YOUR-FIREBASE-KEY",
    measurementId: "YOUR-FIREBASE-KEY"
  })
  firebase.analytics()

export default firebase