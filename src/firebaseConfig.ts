import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { browserLocalPersistence, initializeAuth } from 'firebase/auth'
import { indexedDBLocalPersistence } from 'firebase/auth/cordova'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCacZxcCAeGnqqIVUxDYz0q4DlMtycz4sk',
  authDomain: 'totasks-vue.firebaseapp.com',
  projectId: 'totasks-vue',
  storageBucket: 'totasks-vue.appspot.com',
  messagingSenderId: '588498396092',
  appId: '1:588498396092:web:ab310dfb71defe9c2f01b9',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
// export const auth = getAuth(app)
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
})
