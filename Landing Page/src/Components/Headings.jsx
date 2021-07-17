//Importing React
import React from 'react';

function Headings(props){
    return (
        <div id="headings">
            <p> <strong> <bold>{props.heading} </bold> </strong></p>
        </div>
    )
}

export default Headings;