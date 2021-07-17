//Importing files
import React from 'react';
import FeatureBox from'./FeatureBox';
import featureImage from '../images/feature_1.png';
import featureImage1 from '../images/feature_2.png';
import featureImage2 from '../images/feature_3.png';

function Feature(){
    return (
        <div id="features">
            <div className="a-container">
                <FeatureBox  image={featureImage} title='One On One Video Call' details='Connect face to face with your peers individually!'/>
                <FeatureBox  image={featureImage1} title='Group Video Call' details='Meet face to face with your colleagues and work together!'/>
                <FeatureBox  image={featureImage2} title='Chat and Share' details='Call, chat and share altogether in one app!'/>
            </div>

        </div>
    )
}

export default Feature;