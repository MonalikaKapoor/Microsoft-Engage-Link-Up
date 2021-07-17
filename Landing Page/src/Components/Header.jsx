//Importing files
import React from "react";
import Navbar from "./Navbar";
import MainImage from "../images/MainImage.png"

function Header() {
  return (
    <div id="main">
      <Navbar/>
      <div className='name'>
          <h1><span>Connect with your peers</span> remotely and closely!</h1>
          <p className='details'>Via video calling or chat</p>
          <a target="_blank" href="https://link-up-chat.netlify.app/" className='cv-btn'>Get Started</a>
          <img height='200%' className='mainImage' src={MainImage} alt='Video Conference Graphics'/>
      </div>
    </div>
  );
}

export default Header;