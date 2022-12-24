import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { onValue, ref, set, push } from 'firebase/database';
import useLocalStorage  from './useLocalStorage'
import { RenderDefault } from '.';


export const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState();
    const [todos, setTodos] = useState([])
    const [photos, setPhotos] = useState([])
    const [currentUserName, setCurrentUserName] = useLocalStorage('currentUser','');
    const [currentPhoto, setCurrentPhoto] = useLocalStorage('currentPhoto','');
    const [list, setList] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])

    async function dbProfile (userId) {
        const profileRef = ref(db, 'users/' + userId + '/profile/')
        onValue(profileRef, (snapshot) => {
            setTodos(Object.values(snapshot.val()));
        }) 
        const avatarRef = ref(db, 'users/' + userId + '/avatar/')
        onValue(avatarRef, (snapshot) => {
            setPhotos(Object.values(snapshot.val()));
        })
        console.log(todos)
    }

    async function dbAddProfile (userId, name, photo) {
        const addProfileRef = ref(db, 'users/' + userId + '/profile/')
        const newAddProfileRef = push(addProfileRef)
        await set(newAddProfileRef, [name])


        const addAvatarRef = ref(db, 'users/' + userId + '/avatar/')
        const newAddAvatarRef = push(addAvatarRef)
        await set(newAddAvatarRef, [photo])
    }
    
    
    
    
    async function writeUserData(email,password,userId) {
        const reference = ref(db, 'users/' + userId + '/');
        await set(reference, {
            email : email,
            password : password,
        })
    }
    async function signup(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
        .then(info => {
            writeUserData(email,password,info.user.uid)
            RenderDefault()
            navigate('/')
        }).catch((err) => {
            setError(err.message);
        });
    }

    async function login (email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
        .then(info => {
            RenderDefault()
            navigate('/')
        }).catch((err) => {
            setError(err.message);
        });
    }

    async function logOut () {
        return await signOut(auth)
        .catch((err) => {
            setError(err)
        })
    }
    

    const value = {
        currentUser,
        signup,
        login,
        logOut,
        error,setError,
        currentUserName, setCurrentUserName, 
        currentPhoto, setCurrentPhoto,
        todos, setTodos,
        photos, setPhotos,
        list, setList,
        dbProfile, dbAddProfile
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}