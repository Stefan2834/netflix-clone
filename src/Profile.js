import React, {useEffect} from 'react';
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
    dbProfile
  } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Netflix';
    if(!currentUser) {
      navigate('/signup')
    } else{
      dbProfile(currentUser.uid)
    }
  }, [])
  return (
    <div className='principal-login'>
      <div className='principal-anim'>
      <div className='choose'>Alege un profil</div>
      <div className='flex-login'>
        {todos.map((todo, index) => {
          return (
            <div onClick={() => {
              setCurrentUserName(todo);
              setCurrentPhoto(photos[index]);
              RenderMain();
            }
            } className='login-profile' key={index}><img alt={'Imagine'} src={photos[index]} className='profile-img'  />
              <div className='login-border' />
              <div className='login-name'>{todo}</div>
            </div>
          )
        })}
        {todos.push() < 5 &&
            <button type='button' onClick={() => {RenderAdd()}}className='login-profile-add'>
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