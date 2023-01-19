import React, { useEffect } from 'react'; 
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  let itemScreen = 0;
  const {
    currentUserName,
    list,
    setList,
    filme,
    setError,
    currentUser,
    dbUpdateList
  } = useAuth();
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
    if(!currentUser) {
      navigate('/signup')
    } else {
      dbUpdateList(currentUser.uid, currentUserName)
    }
  }, [list])
  const getItemScreen = () => {
    if(window.innerWidth >= 1200) {
      itemScreen = 6;
    } else if (window.innerWidth >= 1000) {
      itemScreen = 5 
    } else if (window.innerWidth >= 800) {
      itemScreen = 4;
    } else if (window.innerWidth >= 500) {
      itemScreen = 3;
    } else {
      itemScreen = 2;
    }
  }
  getItemScreen()
  let count = [0,0,0]
  function onHandleClick(data,index,slider) {
    let maxSlide = filme.length / itemScreen;
    if(data === 'right') {
      count[index] += 1;
    } else if (data === 'left') {
      count[index] -= 1
    }
    if(count[index] < 0) {
      count[index] = 0;
    } else if(count[index] > maxSlide - 1 && count[index] < maxSlide) {
      count[index] =  count[index] + (maxSlide - parseInt(maxSlide)) - 1
    } else if(count[index] >= maxSlide) {
      count[index] = 0;
    }
    document.documentElement.style.setProperty(slider, count[index])
  }
  return (
    <>
    <div className='main-bg'>
      <div className='main-film-principal'>
        <div className='main-gradient' />
        <div className='main-film-flex'>
          <div className='main-logo' />
          <div className='main-text'>In 1919, in orasul Birmingham din Anglia, Tommy Shelby, seful feroce al unei temute bande de gangsteri, e pus pe capatuiala cu orice pret.</div>
          <div className='main-btn-flex'>
            <div className='main-redare'><i className="fa-solid fa-play" />Redare</div>
            <div className='main-info'><i className="fa-solid fa-circle-info" />Mai multe informatii</div>
          </div>
        </div>
      </div>
      <>
      <div className="film-row">
        <div className="film-header">
          <div className="film-title">Sugestii pentru {currentUserName}</div>
          <div className="film-progress-bar"></div>
        </div>
        <div className="film-container">
          <button className="film-handle film-left-handle"
          onClick={() => {onHandleClick('left',0,'--slider-index1')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-left' /></div>
          </button>
          <div className="film-slider slider1">
          {filme.map((film, index) => {
            return (
            <div className='film-img' key={index}>
              <img src={film.poza} alt={film.name} className='film-bg'/>
              <div className='film-hover'>
                <div className='film-flex'>
                  <div className='film-btn-flex'>
                    <div className='film-btn-play'><i className='fa-solid fa-play' /></div>
                    <div className='film-btn-add'>
                      {list.indexOf(film.name) === -1 ? (
                        <>
                        <div className='film-add-absolute' >Adaugare in Lista mea</div>
                        <i className='fa-solid fa-plus' onClick={() => {addList(film.name)}} />
                        </>
                      ) : (
                        <>
                        <div className='film-add-absolute' >Stergere din Lista mea</div>
                        <i className='fa-solid fa-check' onClick={() => {removeList(film.name)}} />
                        </>
                      )}
                    </div>
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
          })}
          </div>
          <button className="film-handle film-right-handle" 
          onClick={() => {onHandleClick('right',0,'--slider-index1')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-right' /></div>
          </button>
        </div>
      </div>
      </>
    </div>
    </>
  )
}


export default Main