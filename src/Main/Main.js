import React, {useEffect, useRef, useState} from 'react'; 
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import narcos from '../filme/narcos.jpg'

const Main = () => {
  const {
    currentUserName,
    // list,
    // setList,
    // filme,
    currentUser,
    // todos
  } = useAuth();
  const navigate = useNavigate()
  const slider = useRef()
  const Movie = useState([
    'onoarea','lege','pat','a',
    'onoarea','lege','pat','a',
    'onoarea','lege','pat','a',
    'onoarea','lege'
  ])
  useEffect(() => {
    if(!currentUser) navigate('/signup')
  }, [])
  let count = [0,0,0]
  function onHandleClick(data,index,slider) {
    let itemScreen = 6;
    let maxSlide = Movie[0].length / itemScreen;
    if(data === 'right') {
      count[index] += 1;
    } else if (data === 'left') {
      count[index] -= 1
    }
    if(parseInt(count[index]) !== count[index]) {

    }
    if(count[index] < 0) {
      count[index] = maxSlide - 1;
    } else if(count[index] > maxSlide - 1 && count[index] < maxSlide) {
      count[index] =  count[index] + (maxSlide - parseInt(maxSlide)) - 1
    } else if(count[index] >= maxSlide) {
      count[index] = 0;
    }
    document.documentElement.style.setProperty(slider, count[index])
  }
  
  return (
    <div className='main-bg'>
      <NavBar />
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
          <div className="film-slider slider1"
          ref={slider}
          >
          {Movie[0].map((mov, index) => {
            return (
                <img src={narcos} key={index}
                alt="test"
                className='film-img' 
                />
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
      <>
      <div className="film-row">
        <div className="film-header">
          <div className="film-title">Sugestii pentru {currentUserName}</div>
          <div className="film-progress-bar"></div>
        </div>
        <div className="film-container">
          <button className="film-handle film-left-handle"
          onClick={() => {onHandleClick('left',1,'--slider-index2')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-left' /></div>
          </button>
          <div className="film-slider slider2"
          ref={slider}
          >
          {Movie[0].map((mov, index) => {
            return (
                <img src={narcos} 
                alt="test"
                className='film-img' 
                />
                )
              })}
          </div>
          <button className="film-handle film-right-handle" 
          onClick={() => {onHandleClick('right',1,'--slider-index2')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-right' /></div>
          </button>
        </div>
      </div>
      </>
      <>
      <div className="film-row">
        <div className="film-header">
          <div className="film-title">Sugestii pentru {currentUserName}</div>
          <div className="film-progress-bar"></div>
        </div>
        <div className="film-container">
          <button className="film-handle film-left-handle"
          onClick={() => {onHandleClick('left',2,'--slider-index3')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-left' /></div>
          </button>
          <div className="film-slider slider3"
          ref={slider}
          >
          {Movie[0].map((mov, index) => {
            return (
                <img src={narcos} 
                alt="test"
                className='film-img' 
                />
                )
              })}
          </div>
          <button className="film-handle film-right-handle" 
          onClick={() => {onHandleClick('right',2,'--slider-index3')}}
          >
            <div className="film-text"><i className='fa-solid fa-chevron-right' /></div>
          </button>
        </div>
      </div>
      </>
      <Footer />
    </div>
  )
}


export default Main