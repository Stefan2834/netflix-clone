import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { onValue, ref, set, push, remove, update} from 'firebase/database';
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
            if(snapshot.val() !== null) {
                setTodos(Object.values(snapshot.val()));
            }
        }) 
        const avatarRef = ref(db, 'users/' + userId + '/avatar/')
        onValue(avatarRef, (snapshot) => {
            if(snapshot.val() !== null) {
                setPhotos(Object.values(snapshot.val()));
            }
        })
    }
    async function dbAddProfile (userId, name, photo) {
        const addProfileRef = ref(db, 'users/' + userId + '/profile/')
        const newAddProfileRef = push(addProfileRef)
        try {
            await set(newAddProfileRef, [name])
        } catch (err) {
            setError(err)
        }


        const addAvatarRef = ref(db, 'users/' + userId + '/avatar/')
        const newAddAvatarRef = push(addAvatarRef)
        try {
            await set(newAddAvatarRef, [photo])
        } catch(err) {
            setError(err)
        }
        navigate('/')
    }
    async function dbDeleteProfile (userId,name, photo) {
        const deleteProfileRef = ref(db, 'users/' + userId + '/profile/');
        const deleteAvatarRef = ref(db, 'users/' + userId + '/avatar/');
        if(todos.length === 1 && photos.length === 1) {
            setTodos([])
            setPhotos([])
        }
        onValue(deleteProfileRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const profileKey = childSnapshot.key;
                const profileData = childSnapshot.val();
                if(profileData[0] === name[0]) {
                    remove(ref(db, 'users/' + userId + '/profile/' + profileKey + '/'))
                }
            });
        }, {
            onlyOnce:true
        })
        onValue(deleteAvatarRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const avatarKey = childSnapshot.key;
                const avatarData = childSnapshot.val();
                if(avatarData[0] === photo[0]) {
                    remove(ref(db, 'users/' + userId + '/avatar/' + avatarKey + '/'))
                }
            });
        }, {
            onlyOnce:true
        })
        navigate('/')
        RenderDefault()
    }
    async function dbChangePhoto (userId,photo,currentPhoto) {
        const changePhotoRef = ref(db, 'users/' + userId + '/avatar/')
        onValue(changePhotoRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const avatarKey = childSnapshot.key;
                const avatarData = childSnapshot.val();
                if(avatarData[0] === currentPhoto[0]) {
                    const updates = {};
                    updates['users/' + userId + '/avatar/' + avatarKey + '/'] = [photo];
                    return update(ref(db), updates)
                }
            });
        }, {
            onlyOnce:true
        })
        navigate('/')
        RenderDefault()
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
        signup,login,logOut,
        error,setError,
        currentUserName, setCurrentUserName, 
        currentPhoto, setCurrentPhoto,
        todos, setTodos,
        photos, setPhotos,
        list, setList,
        dbProfile, dbAddProfile,dbDeleteProfile, dbChangePhoto
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}