// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'

import {
  getAuth as firebaseGetAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDVTdrce-AUCg5GZge_egqMacMhBOUTFdg',
  authDomain: 'sinsata.firebaseapp.com',
  projectId: 'sinsata',
  storageBucket: 'sinsata.firebasestorage.app',
  messagingSenderId: '980736730711',
  appId: '1:980736730711:web:084e8bc2197d9febb46512',
  measurementId: 'G-2WG0D588Q8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
import { getAnalytics, isSupported } from 'firebase/analytics'
import { loginAndJoin } from '@/app/api/user'

let analytics
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app)
  }
})
export const auth = getAuth(app)

function getAuth(app: FirebaseApp): Auth {
  return firebaseGetAuth(app)
}

export const signInWithGoogle = async (
  auth: Auth
): Promise<UserCredential | null> => {
  const provider = new GoogleAuthProvider()
  try {
    return await signInWithPopup(auth, provider)
    // console.log(result)

    // return result
  } catch (error) {
    return null
  }
}

export const getAuthResult = async (auth: Auth) => {
  return await getRedirectResult(auth)
}
