import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'; 
import { RenderManage,RenderAdd } from "./index";
import { useAuth } from "./AuthContext";

const Gestionare = () => {
  const {
    todos,
    photos,
    setCurrentUserName,
    setCurrentPhoto,
    currentUser,
    dbProfile,
    setError
  } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    if(!currentUser) {
      navigate('/signup')
    } else {
      DB()
    }
  }, [])

  async function DB () {
    try {
      setLoading(true)
      await dbProfile(currentUser.uid)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }
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
            <div className='login-border login-border-gest'><div className="pen"></div></div>
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
    <button className='back'><Link to='/'>Gata</Link></button>
    </div>
  </div>
  </>
  )
}

export default Gestionare