import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const updateUserProfile = profile => updateProfile(auth.currentUser, profile);
    const googleSignIn = _ => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const logOut = _ => {
        localStorage.removeItem('genius-token');
        setLoading(true);
        return signOut(auth);
    };

    useEffect(_ => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return _ => unsubscribe();
    }, [])

    const authInfo = {
        user, loading, createUser, updateUserProfile, signIn, googleSignIn, logOut, setLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;