//Importing files
import React, {useState} from 'react';
import logo from '../images/logo1.png';

function Navbar() {

    const  [nav, setnav] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 50){
            setnav(true);
        }
        else{
            setnav(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <a href='0' className='logo'>
                <img src={logo} alt=''/>
            </a>
            <input type='checkbox' className='menu-btn' id='menu-btn'/>
            <label1 className='menu-icon' for='menu-btn'>
                <span className='nav-icon'></span>
            </label1>
            <ul className='menu'>
                <li><a href='#' className='active'>Home</a></li>
                <li><a href='#about'>About</a></li>
                <li><a href='#features'>Features</a></li>
                <li><a target='_blank' href='https://link-up-video-call.netlify.app/'>Video Call</a></li>
                <li><a target="_blank" href="https://link-up-chat.netlify.app/">Chat</a></li>
                <li><a target="_blank" href="https://link-up-chat.netlify.app/">Sign In</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;