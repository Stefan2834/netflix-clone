import React, { useRef, useEffect, useState } from 'react'
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {

    const emailRef = useRef();
    const passRef = useRef();
    const [loading, setLoading] = useState(false)
    const {
        signup,
        setError,
        error
    } = useAuth()
    async function handleSignUp (e) {
        e.preventDefault()
        try {
            setLoading(true)
            setError();
            await signup(emailRef.current.value, passRef.current.value)
        } catch (err) {
            setError(err);
        }
        setLoading(false)
    }

    useEffect(() => {
        setError()
        document.title = 'Signup - Netflix'
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
                    <input disabled={loading} className="sign-email-submit" type='submit' value="Sign up" />
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
            <div className='sign-tv-subtitle'>Vizioneaz?? pe Smart TV, Playstation, Xbox, Chromecast, Apple TV, playere Blu-ray ??i altele.</div>
        </div>
        <div className='sign-img sign-tv-img' />
    </div>


    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-img sign-phone-img' />
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Descarc?? serialele preferate pentru a le viziona offline.</div>
            <div className='sign-tv-subtitle'>Salveaz?? cu u??urin???? titlurile preferate ??i vei avea mereu ceva de vizionat.</div>
        </div>
    </div>

    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Vizioneaz?? oriunde.</div>
            <div className='sign-tv-subtitle'>Vizioneaz?? nelimitat filme ??i seriale pe telefon, tablet??, laptop ??i televizor, f??r?? alte costuri.</div>
        </div>
        <div className='sign-img sign-oriunde-img' />
    </div>

    <div className='sign-line' />
    <div className='sign-tv'>
        <div className='sign-img sign-copii-img' />
        <div className='sign-tv-text'>
            <div className='sign-tv-title'>Creeaz?? profiluri pentru copii.</div>
            <div className='sign-tv-subtitle'>Trimite copiii ??n aventuri al??turi de personajele favorite, ??ntr-un spa??iu creat special pentru ei, inclus gratuit ??n abonament.</div>
        </div>
    </div>
    </>
  )
}
