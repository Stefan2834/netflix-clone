import React, {useEffect, useState } from 'react';
import { RenderMain,RenderAdd } from "./index.js";
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const Profile = () => {
  const {
    todos,
    photos,
    setCurrentUserName,
    setCurrentPhoto,
    currentUser,
    dbProfile,
    setError,
    dbFilme, dbList
  } = useAuth();

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  async function getTodos () {
      try {
        setLoading(true)
        await dbProfile(currentUser.uid)
      } catch (err) {
        setError(err)
      }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'Netflix';
    if(!currentUser) {
      navigate('/signup')
    } else {
      getTodos()
      dbFilme()
    }
  }, [])

  return (
    <div className='principal-login'>
      <div className='principal-anim'>
      <div className='choose'>Alege un profil</div>
      <div className='flex-login'>
        {todos.map((todo, index) => {
          return (
            <div onClick={async () => {
              await setCurrentUserName(todo[0]);
              await setCurrentPhoto(photos[index]);
              await dbList(currentUser.uid, todo[0])
              RenderMain();
            }
            } className='login-profile' key={index}><img alt={'Imagine'} src={photos[index]} className='profile-img'  />
              <div className='login-border' />
              <div className='login-name'>{todo[0]}</div>
            </div>
          )
        })}
        {todos.push() < 5 &&
            <button disabled={loading} type='button' onClick={RenderAdd}className='login-profile-add'>
              <div className='add-circle'><div className='add-plus'></div></div>
              <div className='login-name login-name-add'>Adauga un profil</div>
            </button>
        }
      </div>
      <button className='gestionare'><Link to='/manage'>Gestionarea profilurilor</Link></button>
      </div>
    </div>
  )  
}

export default Profile