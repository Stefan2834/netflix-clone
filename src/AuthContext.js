import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { onValue, ref, set, push, remove, update} from 'firebase/database';
import { RenderDefault } from '.';
import breakingBad from './filme/breaking-bag.jpg';
import narcos from './filme/narcos.jpg';
import stranger from './filme/stranger-things.png';
import vikings from './filme/vikingi.jpg';
import dark from './filme/dark.jpg';
import betterCallSaul from './filme/better-call-saul.png'
import driveToSurvive from './filme/drive-to-survive.jpg'
import moneyHeist from './filme/money-heist.jpg'
import lucifer from './filme/lucifer.webp'
import narcosMexic from './filme/narcos-mexic.jpg'
import peakyBlinders from './filme/peaky-blinders.jpg'
import blackList from './filme/black-list.jpg'
import lastDance from './filme/last-dance.jpg'
import theWitcher from './filme/the-witcher.jpg'
import peaky1 from './filme/peaky1.webp'
import peaky2 from './filme/peaky2.jpg'
import peaky3 from './filme/peaky3.jpg'
import peaky4 from './filme/peaky4.jpg'
import peaky5 from './filme/peaky5.jpg'

function Reducer (list, action) {
    switch(action.type) {
      case('add'):
        return [...list, action.payload.name]
      case('remove'):
        return list.filter(n => n !== action.payload.name)
      case('getDb'):
        return [action.payload.value]
      default:
        return []
    }
  }


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
    const [filme, setFilme] = useState()
    const [currentUserName, setCurrentUserName] = useState();
    const [currentPhoto, setCurrentPhoto] = useState();
    const [list, dispatch] = useReducer(Reducer, [])
    let sliderCount = [0,0,0,0,0]
    // useLocalStorage('currentUser','');
    // const [list, setList] = useState();
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
    async function test () {
        const reference = ref(db, 'filme/');
        await set(reference, [
            {varsta:"16+",sezoane:3,poza:narcos,detalii:["Dur","Intunecat","Cu suspans"],name:"Narcos"},
            {varsta:"16+",sezoane:5,poza:breakingBad,detalii:["Violent","Durt","Intunecat"],name:"BreakingBad"},
            {varsta:"16+",sezoane:4,poza:stranger,detalii:["Sinistru","Infricosator","Violent"],name:"Stranger"},
            {varsta:"16+",sezoane:6,poza:vikings,detalii:["Violent","Captivant","De epoca"],name:"Vikings"},
            {varsta:"16+",sezoane:6,poza:betterCallSaul,detalii:["Insolit","Dur","Drama"],name:"BetterCallSaul"},
            {varsta:"16+",sezoane:5,poza:driveToSurvive,detalii:["Documentar","Dramatic","Captivant"],name:"DTS"},
            {varsta:"16+",sezoane:5,poza:moneyHeist,detalii:["Cu suspans","Captivant","Violent"],name:"MoneyHeist"},
            {varsta:"16+",sezoane:3,poza:dark,detalii:["Tulburator","Inspaimantator","Sinistru"],name:"Dark"},
            {varsta:"16+",sezoane:6,poza:peakyBlinders,detalii:["Violent","Drama","Politist"],name:"PeakyBlinders"},
            {varsta:"13+",sezoane:6,poza:lucifer,detalii:["Ireverentio","Captivant","Drama"],name:"Lucifer"},
            {varsta:"18+",sezoane:3,poza:narcosMexic,detalii:["Dur","Intunecat","Captivant"],name:"NarcosMexic"},
            {varsta:"16+",sezoane:2,poza:theWitcher,detalii:["Captivant","Actiune","Drama"],name:"TheWitcher"},
            {varsta:"16+",sezoane:9,poza:blackList,detalii:["Captivant","Drama","Violent"],name:"BlackList"},
            {varsta:"16+",sezoane:1,poza:lastDance,detalii:["Reconfortant","Documentar","Interesant"],name:"LastDance"}
        ])
    }
    // test()
    async function dbAddProfile (userId, name, photo) {
        const addProfileRef = ref(db, 'users/' + userId + '/profile/')
        const newAddProfileRef = push(addProfileRef)
        try {
            await set(newAddProfileRef, [name, {}])
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
                if(profileData[0] === name) {
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
    async function dbFilme () {
        const filmeRef = ref(db, 'filme/')
        onValue(filmeRef, (snapshot) => {
            if(snapshot.val() !== null) {
                const sort = Object.values(snapshot.val()).sort(sortFilme)
                function sortFilme (a,b) {
                    return 0.5 - Math.random()
                }
                setFilme(sort);
            }
        })
    }
    async function dbList (userId,name) {
        const listRef = ref(db, 'users/' + userId + '/profile/')
        onValue(listRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const profileKey = childSnapshot.key;
                const profileData = childSnapshot.val();
                if(name === profileData[0]) {
                    const profileListRef = ref(db, 'users/' + userId + '/profile/' + profileKey + '/')
                    onValue(profileListRef, (snapshot) => {
                        if(snapshot.val()[1] != null) {
                            dispatch({type:'getDb',payload:{value: snapshot.val()[1]}})
                        }
                    })
                }
            });
        }, {
            onlyOnce:true
        })
    }
    async function dbUpdateList (userId,name) {
        const listRef = ref(db, 'users/' + userId + '/profile/')
        onValue(listRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const listKey = childSnapshot.key;
                const listData = childSnapshot.val();
                if(name === listData[0]) {
                    const updates = {};
                    console.log(list);
                    updates['users/' + userId + '/profile/' + listKey + '/'] = [name,  ...list];
                    update(ref(db), updates)
                }
            })
        }, {
            onlyOnce:true
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
    function generate () {
        const random = [peaky1, peaky2, peaky3, peaky4, peaky5]
        return random[parseInt(Math.random() * 5)]
    }
    const value = {
        currentUser,
        signup,login,logOut,
        error,setError,
        currentUserName, setCurrentUserName, 
        currentPhoto, setCurrentPhoto,
        todos, setTodos,
        photos, setPhotos,
        list, dispatch,
        dbProfile, dbAddProfile,
        dbDeleteProfile, dbChangePhoto,
        filme,dbFilme,dbList, dbUpdateList, test, generate, sliderCount
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}