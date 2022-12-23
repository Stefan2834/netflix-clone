import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-icon'>
      <i className="fa-brands fa-facebook-f" />
      <i className="fa-brands fa-instagram" />
      <i className="fa-brands fa-youtube" />
      </div>
      <div className='footer-flex'>
        <div className='footer-flex-section'>
          <div className='footer-text'>Descriere audio</div>
          <div className='footer-text'>Relatii cu investitorii</div>
          <div className='footer-text'>Mentiuni legale</div>
        </div>
        <div className='footer-flex-section'>
          <div className='footer-text'>Asistenta</div>
          <div className='footer-text'>Cariere</div>
          <div className='footer-text'>Preferinte de cookie</div>
        </div>
        <div className='footer-flex-section'>
          <div className='footer-text'>Carduri cadou</div>
          <div className='footer-text'>Conditii de utilizare</div>
          <div className='footer-text'>Informatii pentru companie</div>
        </div>
        <div className='footer-flex-section'>
          <div className='footer-text'>Centru media</div>
          <div className='footer-text'>Declaratia de confidentialitate</div>
          <div className='footer-text'>Contacteaza-ne</div>
        </div>
      </div>
      <div className='footer-btn'>
        <div className='footer-btn-code'>Cod de serviciu</div>
        <div className='footer-copy'>© 1977 - 2022 Netflix, Inc.</div>
      </div>
    </div>
  )
}


export default Footer