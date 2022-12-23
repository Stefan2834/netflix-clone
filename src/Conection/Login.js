import React, { useEffect, useRef } from 'react'
import { useAuth } from '../AuthContext'

export default function Login() {
  const passRef = useRef()
  const emailRef = useRef()
  const {login, error, setError} = useAuth()

  useEffect(() => {
    setError()
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
    <form onSubmit={handleLogin}>
      <input type='email' ref={emailRef} required/>
      <input type='password' ref={passRef} required/>
      <input type='submit' value='Login' />
      {error && (<div>{error}</div>)}
    </form>
  )
}
