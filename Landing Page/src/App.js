//Importing files
import React from 'react';
//Importing different components
import Header from './Components/Header';
import Feature from './Components/Feature';
import About from './Components/About';
import Presentation from './Components/Presentation';
import aboutImage from'./images/About_1.png';
import aboutImage1 from'./images/About_2.png';
import Contact from './Components/Contact';
import Heading from './Components/Headings';

function App() {
  return (
    <div className="App">
      <Header/>
      <Heading heading='ABOUT'/>
      <About image={aboutImage} title='A simple video calling app that brings you face-to-face with the people who matter most.' button= {<a target="-blank" href="https://link-up-video-call.netlify.app/">Get Started</a>} text='Using your browser, talk, chat and share your video, desktop or presentations with teammates and customers ' />
      <About image={aboutImage1} title='Chat with your friends or discuss in groups!' button={<a target="_blank" href="https://link-up-chat.netlify.app/">Get Started</a>} text='An elegant way to chat and share pictures individually or in teams.' />
      <Heading heading='FEATURES'/>
      <Feature/>
      <Presentation/>
      <Waves></Waves>
      <Contact/>
    </div>
  );
}

export default App;
