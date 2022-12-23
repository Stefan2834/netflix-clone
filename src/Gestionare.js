import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'; 
import { RenderManage,RenderAdd } from "./index";
import { useAuth } from "./AuthContext";

const Gestionare = () => {
  const {
    todos,
    photos,
    setCurrentUserName,
    setCurrentPhoto,
    currentUser
  } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser) {
      navigate('/signup')
    }
  })
  return (
    <>
    <div className='principal-login'>
    <div className='principal-anim'>
    <div className='choose'>Gestionarea profilurilor</div>
    <div className='flex-login'>
    {todos.map((todo, index) => {
      return (
        <div className='login-profile' key={index} onClick={() => {
          setCurrentUserName(todo);
          setCurrentPhoto(photos[index]);
          RenderManage();
        }}>
          <img className='profile-img' src={photos[index]} alt={'Imagine'} />
            <div className='pen'><button data-username={todo} className='gestionare-btn'>
            <div className='login-border' />
            </button></div>
            <div className='login-name'>{todo}</div>
          </div>
        )
      })}
      {todos.push() < 5 &&
          <button type='button' onClick={() => {RenderAdd()}}className='login-profile-add'>
            <div className='add-circle'><div className='add-plus'></div></div>
            <div className='login-name'>Adauga un profil</div>
          </button>
      }
    </div>
    <button className='back'><Link to='/'>Gata</Link></button>
    </div>
  </div>
  </>
  )
}

export default Gestionare