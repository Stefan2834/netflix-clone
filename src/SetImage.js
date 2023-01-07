import React from 'react'
import { RenderManage } from '.';
import { useAuth } from './AuthContext';

export default function Image() {
    const {
        setCurrentPhoto,
        currentUserName,
        currentPhoto,
        photos,
        dbChangePhoto,
        setError,
        currentUser
    } = useAuth();
    const flatPhotos = [].concat.apply([], photos)
    const avatar = ['./avatar/default.jpg',
    './avatar/default1.jpg',
    './avatar/default2.jpg',
    './avatar/default3.jpg',
    './avatar/default4.jpg',
    './avatar/avatar1.jpg',
    './avatar/avatar2.png',
    './avatar/avatar3.jpg',
    './avatar/avatar4.png',]

    const photoChange = async (photo) => {
        try {
            await dbChangePhoto (currentUser.uid,photo,currentPhoto)
            setCurrentPhoto(photo)
        } catch (err){
            setError(err)
        }
    }
    return (
    <div className='set-bg'>
        <div className='set-anim'>
            <div className='set-bar'>
                <div className='set-left'>
                    <div onClick={RenderManage} className='set-back'>
                        <i class='fa-solid fa-arrow-left set-arrow' />
                     </div>
                    <div className='set-flex-text'>
                        <div className='set-title'>Editarea profilului</div>
                        <div className='set-subtitle'>Alege o pictograma de profil.</div>
                    </div>
                </div>
                <div className='set-right'>
                    <div className='set-name'>{currentUserName}</div>
                    <img 
                        src={currentPhoto} 
                        alt='Profile picture' 
                        className='set-img'
                    />
                </div>
            </div>
            <div className='set-images'>
                <div className='set-name'>Clasice</div>
                <div className='set-bg-photo'>
                {avatar.map((photo, index) => (
                    flatPhotos.indexOf(photo) === -1 && (
                        <>
                        <div className='set-bg-select'
                            key={index}
                            onClick={() => {photoChange(photo)}}
                            >
                            <img src={photo} 
                                alt='Select bg'
                                className='set-select'
                                />
                            <div className='set-bg-border' />
                        </div>  
                        </>
                    )
                ))}    
                </div>
            </div>
        </div>
    </div>
  )
}
