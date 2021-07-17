//Importing files
import React from 'react';
import Heading from './Headings';

function About(props) {
  return (
    <div id="about">
        <div className="about-image">
            <img src={props.image} alt=''/>
        </div>
        <div className="about-text">
            <h2> {props.title} </h2>
            <p> {props.text} </p>
            <a> {props.button} </a>
        </div>
    </div>
  );
}

export default About;
