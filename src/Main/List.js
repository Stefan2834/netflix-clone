import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

export default function List() {
  const {
    list,
    filme,
    currentUserName,
    setError,
    setList,
    dbUpdateList,
    currentUser
  } = useAuth()
  const navigate = useNavigate()
  const addList = async (name) => {
    try {
      setList(l => [...l,name ])
    } catch (err) {
      setError(err)
    }
  }
  const removeList = async (name) => {
    try {
      setList(l => l.filter(n => n !== name))
    } catch (err) {
      setError(err)
    }
  }
  useEffect(() => {
    if (!currentUserName) {
      navigate('/')
    } 
    if(!currentUser) {
      navigate('/signup')
    } else {
      dbUpdateList(currentUser.uid, currentUserName)
    }
  
  }, [list])
  return (
    <>
    <div className="list-row">
        <div className="film-header">
          <div className="film-title list-title">Lista mea</div>
          <div className="film-progress-bar"></div>
        </div>
        <div className="film-container">
          <button className="film-handle film-left-handle list-handle">
            <div className="film-text"></div>
          </button>
          <div className="film-slider slider1 list-slider">
          {list != null && (
          filme.map((film, index) => {
            if(list.indexOf(film.name) !== -1) return (
            <div className='film-img list-img' key={index}>
              <img src={film.poza} alt={film.name} className='film-bg'/>
              <div className='film-hover'>
                <div className='film-flex'>
                  <div className='film-btn-flex'>
                    <div className='film-btn-play'><i className='fa-solid fa-play' /></div>
                    {list.indexOf(film.name) === -1 ? (
                      <div className='film-btn-add' onClick={() => {addList(film.name)}}>
                        <div className='film-add-absolute' >Adaugare in Lista mea</div>
                        <i className='fa-solid fa-plus' />
                      </div>
                      ) : (
                      <div className='film-btn-add' onClick={() => {removeList(film.name)}}>
                        <div className='film-add-absolute' >Stergere din Lista mea</div>
                        <i className='fa-solid fa-check' />
                      </div>
                      )}
                    <div className='film-btn-like'><i className='fa-solid fa-thumbs-up' /></div>
                    <div className='film-btn-info'><i className='fa-solid fa-chevron-down' /></div>
                  </div>
                  <div className='film-det'>
                    <div className='film-new'>Nou</div>
                    <div className='film-age'>{film.varsta}</div>
                    <div className='film-time'>{film.sezoane} sezoane</div>
                    <div className='film-hd'>HD</div>
                  </div>
                  <div className='film-info'>
                    {film.detalii[0]} <span style={{color:"grey"}}> &#8226;</span> {film.detalii[1]} <span style={{color:"grey"}}> &#8226;</span> {film.detalii[2]}
                  </div>
                </div>
              </div>
            </div>
            )
          }))}
          </div>
          <button className="film-handle film-right-handle list-handle">
            <div className="film-text"></div>
          </button>
        </div>
      </div>
    </>
  )
}
