import React, {useEffect} from 'react'; 
import { RenderDefault,RenderImage } from "./index";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 

const Manage = () => {
  const {
    currentUserName,
    currentPhoto,
    setCurrentUserName,
    currentUser,
    dbDeleteProfile,
  } = useAuth();

  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Netflix';
    if(!currentUser) {
      navigate('/signup')
    }
  }, [])
  function deleteProfile () {
    dbDeleteProfile(currentUser.uid,currentUserName, currentPhoto)
  }
  return (
    <>
    <div className='gest-bg'>
    <div className='gest-anim'>
      <div className='gest-name'>Editarea profilului
        <div className='gest-line' />
        <div className='gest-icon'>
          <div className='gest-img-change' onClick={RenderImage}/>
          <img className='gest-image'src={currentPhoto} alt={'Imagine'} />
        </div>
        <div className='gest-input-name'>
          <form>
            <input className='gest-input-name-text' onChange={(e) => setCurrentUserName(e.target.value)} type='text' value={currentUserName} placeholder='Numele' />
          </form>
        </div>
      <div className='gest-flex'>
        <div className='gest-limba'>Limba de afisare:</div>
        <div className='gest-limba-select'>Romana</div>
        <div className='gest-pseudonim'>Pseudonim pentru jocuri:</div>
        <div className='gest-pseudonim-subtitlu'>Pseudonimul tau este un nume unic pe care-l vei putea folosi in Jocurile Netflix pentru a interactiona cu alti abonati Netflix.<span className='gest-detalii'> Detalii</span></div>
        <div className='gest-pseudonim-input'>
          <input type='text' placeholder='Creare pseudonim pentru jocuri' className='gest-pseudonim-input-text' />
        </div>
        <div className='gest-line-second' />
        <div className='gest-varsta'>Setarile categoriei de varsta:</div>
        <div className='gest-varsta-toate'>Toate categoriile de varsta</div>
        <div className='gest-varsta-text'>Pentru acest profile, afiseaza titluri din toate categoriile de varsta</div> 
        <div className='gest-edit'>Editare</div>
        <div className='gest-line-second' />
        <div className='gest-optiuni'>Optiuni de redare automata</div>
        <div className='gest-check-flex'>
        <input checked className='gest-checkbox' type='checkbox'></input>
        <label>Redarea automata a episodului urmator dintr-un serial pe toate dispozitivele.</label>
        </div>
        <div className='gest-check-flex'>
          <input checked className='gest-checkbox' type='checkbox'></input>
          <label>Redarea automata a previzionarilor in timpul navigarii pe toate dispozitivele.</label>
        </div>
      </div>
      <div className='gest-line-third' />
      <div className='gest-flex-btn'>
        <button onClick={RenderDefault}className='gest-save'>Salvare</button>
        <button onClick={RenderDefault}className='gest-anulare'>Inapoi</button>
        <div onClick={deleteProfile} className='gest-sterge'>Stergerea profilului</div>
      </div>
      </div>
    </div>
    </div>
    </>
  )
} 

export default Manage