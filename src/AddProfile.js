import React, { useState, useEffect } from 'react'; 
import { RenderDefault } from './index';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProfile = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('')
  const {todos, dbAddProfile, currentUser, photos} = useAuth();
  const navigate = useNavigate()


  function getPhotos () {
    const flatPhotos = [].concat.apply([], photos)
    if(!flatPhotos.includes('./avatar/default.jpg')) {
      setImg('./avatar/default.jpg')
    } else if(!flatPhotos.includes('./avatar/avatar1.jpg')) {
      setImg('./avatar/avatar1.jpg')
    } else if(!flatPhotos.includes('./avatar/avatar2.png')) {
      setImg('./avatar/avatar2.png')
    } else if(!flatPhotos.includes('./avatar/avatar3.jpg')) {
      setImg('./avatar/avatar3.jpg')
    } else if(!flatPhotos.includes('./avatar/avatar4.png')) {
      setImg('./avatar/avatar4.png')
    } 
  }

  useEffect(() => {
    getPhotos()
  }, [])
  
  const addTodo = (e) => {
    e.preventDefault();
    if(todos.push() < 5) {
      dbAddProfile(currentUser.uid, name, img)
    } else {
      navigate('/')
    }
    setName('');
    RenderDefault();
  } 
  return (
    <div className='add-profile'>
      <div className='add-flex'>
      <div className='add-anim'>
      <div className='add-title'>Adaugarea unui profil</div>
      <div className='add-subtitle'>Adauga un profil pentru alta persoana care vizioneaza pe Netflix.</div>
      <div className='add-line' />
      <div className='add-input-flex'>
        <img src={img} 
          className='add-icon'
          alt='Profile Picture'
        />
        <div className='add-form'>
          <form onSubmit={addTodo}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}className='add-input' placeholder='Numele' required/>
            <input className='add-submit' type='submit' value='Continuare' />
          </form>
        </div>
        <div className='add-checkbox'>
          <input className='add-checkbox-input'type='checkbox' />
          <label className='add-label'>Copil</label>
        </div>
        <button type='button'className='add-anulare' onClick={RenderDefault}>Anulare</button>
      </div>
      <div className='add-line' />
      </div>
      </div>
    </div>
  )
}

export default AddProfile
