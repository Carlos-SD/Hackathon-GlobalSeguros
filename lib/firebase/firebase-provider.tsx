"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

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
const app = typeof window !== "undefined" ? initializeApp(firebaseConfig) : null
const auth = app ? getAuth(app) : null
const db = app ? getFirestore(app) : null

interface FirebaseContextType {
  user: User | null
  loading: boolean
  auth: typeof auth
  db: typeof db
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <FirebaseContext.Provider value={{ user, loading, auth, db }}>{children}</FirebaseContext.Provider>
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}
