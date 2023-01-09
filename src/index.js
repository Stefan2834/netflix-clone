import ReactDOM from "react-dom/client";
import React from 'react'; 
import './index.css';
import App from './App.js'
import Profile from './Profile.js'
import AddProfile from './AddProfile.js'
import Gestionare from './Gestionare.js'
import Manage from './Manage.js'
import Main from './Main/Main.js'
import Image from './SetImage.js'




const root = ReactDOM.createRoot(document.getElementById('root'));




export const RenderDefault = () => {
  root.render(<App render={Profile} manage={Gestionare} />) 
}
export const RenderAdd = () => {
  root.render(<App render={AddProfile} manage={AddProfile} />)
}
export const RenderManage = () => {
  root.render(<App manage={Manage}/>);
}
export const RenderMain = () => {
  root.render(<App render={Main} manage={Gestionare}/>);
}
export const RenderImage = () => {
  root.render(<App render={Profile} manage={Image}/>);
}
RenderDefault();