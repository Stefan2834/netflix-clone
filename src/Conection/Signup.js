import React, { useRef, useEffect } from 'react'
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {

    const emailRef = useRef();
    const passRef = useRef();
    const {
        signup,
        setError,
        error
    } = useAuth()
    async function handleSignUp (e) {
        e.preventDefault()
        try {
            setError();
            await signup(emailRef.current.value, passRef.current.value)
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        setError()
    }, [])
    
    return (
    <>
    <div className='sign-page'>
        <div className='sign-bar'>
            <div className='sign-logo' /> 
            <div className='sign-btn'>
                <div className='sign-ro'>Romana</div>
                <div className='sign-connect'><Link to='/login'>Conectare</Link></div>
            </div>
        </div>
        <div className="sign-main">
            <div className='sign-flex'>
                <div className='sign-main-title'>Acces nelimitat la filme, seriale si multe altele.</div>
                <div className='sign-main-text'>Vizioneaza oriunde. Anuleaza oricand</div>
                <div className='sign-main-minitext'>Esti gata de vizionare? Introdu adresa de email pentru a te abona sau pentru a reactiva abonamentul.</div>
                <form className='sign-form-flex' onSubmit={handleSignUp}>
                    <input className='sign-email' ref={emailRef} type='email' placeholder='Adresa de e-mail' />
                    <input className='sign-pass' ref={passRef} type='password' placeholder='Parola' />
                    <input className="sign-email-submit" type='submit' value="Sign up" />
                </form>
                {error && (
                    <div className='sign-error'>{error}</div>
                )}
            </div> 
        </div>
    </div>
    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Vizionare pe TV.</div>
            <div className='sign-tv-subtitle'>Vizionează pe Smart TV, Playstation, Xbox, Chromecast, Apple TV, playere Blu-ray și altele.</div>
        </div>
        <div className='sign-img sign-tv-img' />
    </div>


    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-img sign-phone-img' />
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Descarcă serialele preferate pentru a le viziona offline.</div>
            <div className='sign-tv-subtitle'>Salvează cu ușurință titlurile preferate și vei avea mereu ceva de vizionat.</div>
        </div>
    </div>

    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Vizionează oriunde.</div>
            <div className='sign-tv-subtitle'>Vizionează nelimitat filme și seriale pe telefon, tabletă, laptop și televizor, fără alte costuri.</div>
        </div>
        <div className='sign-img sign-oriunde-img' />
    </div>

    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-img sign-copii-img' />
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Creează profiluri pentru copii.</div>
            <div className='sign-tv-subtitle'>Trimite copiii în aventuri alături de personajele favorite, într-un spațiu creat special pentru ei, inclus gratuit în abonament.</div>
        </div>
    </div>
    </>
  )
}
