// Configuración de Firebase separada para mejor organización

import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDemoPurposes",
  authDomain: "segurapp-demo.firebaseapp.com",
  projectId: "segurapp-demo",
  storageBucket: "segurapp-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
}

// Initialize Firebase
let app
let auth
let db
let messaging

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)

  // Solo inicializar messaging en navegadores compatibles
  if ("serviceWorker" in navigator) {
    try {
      messaging = getMessaging(app)
    } catch (error) {
      console.warn("Firebase messaging not supported in this browser")
    }
  }
}

export { app, auth, db, messaging }
