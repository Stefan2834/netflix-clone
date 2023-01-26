import React, { useEffect, useLayoutEffect, useState } from 'react'; 
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar.js';
import Footer from './Footer.js';


const Main = () => {
  const {
    currentUserName,
    list,
    filme,
    dispatch,
    currentUser,
    dbUpdateList,
    generate, sliderCount
  } = useAuth();
  const navigate = useNavigate()
  const [mainBg, setMainBg] = useState()
  const [collums] = useState([`Sugestii pentru ${currentUserName}`,'Populare Acum','Doar pe Netflix','Seriale aprieciate de critici'])
  useEffect(() => {
    if(!currentUser) {
      navigate('/signup')
    } else {
      dbUpdateList(currentUser.uid,currentUserName)
    }
  }, [list])
  useLayoutEffect(() => {
    setMainBg(generate())
  }, [currentUserName])
  function onHandleClick(data,index,slider) {
    let itemScreen = getComputedStyle(document.documentElement).getPropertyValue('--items-per-screen')
    let maxSlide = filme.length / itemScreen;
    if(data === 'right') {
      sliderCount[index] += 1;
    } else if (data === 'left') {
      sliderCount[index] -= 1
    }
    if(sliderCount[index] < 0) {
      sliderCount[index] = 0;
    } else if(sliderCount[index] > maxSlide - 1 && sliderCount[index] < maxSlide) {
      sliderCount[index] =  sliderCount[index] + (maxSlide - parseInt(maxSlide)) - 1
    } else if(sliderCount[index] > maxSlide - 1) {
      sliderCount[index] = maxSlide - 1;
    }
    document.documentElement.style.setProperty(slider, sliderCount[index])
  }
  return (
    <>
    <NavBar />
    <div className='main-bg'>
      <div className='main-film-principal'>
        <img src={mainBg} className='main-frame' alt='MainBg' />
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
      <div className='film'>
      {collums.map((collum,ind) => {
      return (
      <div className="film-row" key={ind}>
        <div className="film-header">
          <div className="film-title">{collum}</div>
          <div className="film-progress-bar"></div>
        </div>
        <div className="film-container">
          <button className="film-handle film-left-handle" 
          onClick={() => {onHandleClick('left',ind,`--slider-index${ind}`)}} 
          >
            <div className="film-text"><i className='fa-solid fa-chevron-left' /></div>
          </button>
          <div className={`film-slider slider${ind}`}>
          {filme.map((film, index) => {
            return (
            <div className='film-img'>
              <img src={film.poza} alt={film.name} className='film-bg'/>
              <div className='film-img-absolute' key={index}>
              <img src={film.poza} alt={film.name} className='film-bg'/>
              {/* <iframe className='film-bg' src={''} title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe> */}
              <div className='film-hover'>
                <div className='film-flex'>
                  <div className='film-btn-flex'>
                    <div className='film-btn-play'><i className='fa-solid fa-play' /></div>
                    {list.indexOf(film.name) === -1 ? (
                      <div className='film-btn-add' onClick={() => dispatch({type: 'add',payload:{name:film.name}})}>
                        <div className='film-add-absolute' >Adaugare in Lista mea</div>
                        <i className='fa-solid fa-plus' />
                      </div>
                      ) : (
                      <div className='film-btn-add' onClick={() => dispatch({type: 'remove',payload:{name:film.name,}})}>
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
            </div>
            )
          })}
          </div>
          <button className="film-handle film-right-handle"
          onClick={() => {onHandleClick('right',ind,`--slider-index${ind}`)}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-right' /></div>
          </button>
        </div>
      </div>
      )})}
      </div>
    </div>
    <Footer />
    </>
  )
}
export default Main