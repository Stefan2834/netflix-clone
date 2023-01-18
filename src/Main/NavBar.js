import React from 'react'; 
import { Link } from "react-router-dom";
import { RenderMain,RenderDefault } from "../index";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const {
    currentPhoto, 
    setCurrentPhoto, 
    currentUserName, 
    setCurrentUserName,
    todos,
    currentUser,
    dbList,
    photos,
    logOut,
    setError,
  } = useAuth();

  const navigate = useNavigate()

  async function handleLogOut (e) {
    e.preventDefault()
    try {
      setError()
      await logOut();
      navigate('/login')
    } catch (err) {
      setError(err)
    }
  }

  
  return (
    <div className='navbar'>
    <div className='logo'></div>
    <div className='nav-rasfoire'>Rasfoire</div>
    <div className='nav-left'>
      <div className='nav-text active'><Link to='/'>Pagina principala</Link></div>
      <div className='nav-text'><Link to='/'>Seriale</Link></div>
      <div className='nav-text'><Link to='/'>Filme</Link></div>
      <div className='nav-text'><Link to='/'>Noi si populare</Link></div>
      <div className='nav-text'><Link to='/'>Lista mea</Link></div>
      <div className='nav-text'><Link to='/'>Rasfoieste dupa limba</Link></div>
    </div>
    <div className='nav-right'>
      <div className='nav-icon'><i className="fa-solid fa-magnifying-glass" /></div>
      <div className='nav-icon'>Copii</div>
      <div className='nav-icon'><i className="fa-regular fa-bell" /></div>
      <div className='nav-icon'>
        <img className='nav-image'src={currentPhoto} alt={'Imagine'}></img>
        <i className="fa-solid fa-caret-up" />
        <div className='nav-drop'>
        <i className="fa-solid fa-caret-up nav-up" />
        {todos.map((todo, index) => 
        (todo[0] !== currentUserName && (
            <div className='nav-name' key={index} onClick={() => {
              setCurrentUserName(todo[0]);
              dbList(currentUser.uid, todo[0])
              setCurrentPhoto(photos[index]);
              RenderMain();
            }}>
              <img src={photos[index]} alt={'Imagine'} className='nav-avatar' />
              <span className='nav-under'>{todo[0]}</span>
            </div>
          )
        ))}
          <div className='nav-name'><i className="fa-solid fa-pencil" /><span className='nav-under'><Link onClick={RenderDefault} to='/manage'>Gestionare profilurilor</Link></span></div>
          <div className='nav-name'><i className="fa-solid fa-retweet" /><span className='nav-under'>Transfera profilul</span></div>
          <div className='nav-name'><i className="fa-regular fa-user" /><span className='nav-under'>Cont</span></div>
          <div className='nav-name'><i className="fa-regular fa-circle-question" /><span className='nav-under'>Asistenta</span></div>
          <div className='nav-line'></div>
          <div className='nav-name nav-disconnect' onClick={handleLogOut}><span className='nav-under'>Deconectare</span></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NavBar