import React, { useEffect, useRef } from 'react'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'

export default function Login() {
  const passRef = useRef()
  const emailRef = useRef()
  const {login, error, setError} = useAuth()

  useEffect(() => {
    setError()
    document.title = 'Login - Netflix'
  }, [])

  async function handleLogin (e) {

    e.preventDefault()
    try {
      setError()
      await login(emailRef.current.value, passRef.current.value)
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <>
    <div className='log-page'>
      <div className='log-bar'>
        <div className='log-logo'></div>
      </div>
      <div className='log-form-flex'>
        <form onSubmit={handleLogin} className="log-form">
        <div className='log-title'>Conectare</div>
          <input type='email' ref={emailRef} className="log-email" required/>
          <input type='password' ref={passRef} className="log-pass" required/>
          <input type='submit' value='Conectare' className='log-submit' />
          <div className='log-under'>
            <input type="checkbox" /><label className='log-check'>Tine-ma minte</label>
            <div className='log-help'>Ai nevoie de ajutor?</div>
          </div>
          <div className='log-text'>Esti nou pe Netflix? <Link to='/signup'>Inregistreaza-te acum</Link></div>
          <div className='log-det'>Această pagină este protejată prin Google reCAPTCHA pentru a ne asigura că nu ești un robot. </div>
          {error && (<div className='log-absolute'>{error}</div>)}
        </form>
      </div>
    </div>
    </>
  )
}
