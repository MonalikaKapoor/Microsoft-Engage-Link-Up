//Chats.js contains the js for the chat page of Link Up Chats

//Importing React
import React, { useRef, useState, useEffect} from 'react';
//Importing useHistory 
import { useHistory, Link, Redirect } from 'react-router-dom';
//Importing Chat Engine
import { ChatEngine } from 'react-chat-engine';
//Importing Auth Object from firebase
import { auth } from '../firebase';
//Calling function created in useContext
import { useAuth} from '../contexts/AuthContext';
//Importing axios
import axios from 'axios';
//Importing logo
import logo from './logo9.png'

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth(); //To populate the user variable with data in useAuth
    console.log(user);
    const [loading, setLoading] = useState(true);
    const roomID = 1;

    //Function for logout
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/'); //For users to login again
    }

    //Function to get user's image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })

    }

    //Creating a useEffect function
    useEffect(() => {
        //If there is no user then call history i.e push the user to login
        if(!user) {
            history.push('/'); //push the user to login
                
            return; //so that we don't enter the code below
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email, //Taking the real user data coming from useAuth 
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        //If the user is not registered on ChatEngine
        //To create a ChatEngine Profile
        .catch(() => {
            //Creating all the form data
            console.log(user.email)
            let formData = new FormData();
            formData.append('email', user.email); //User's email
            formData.append('username', user.email); //User's name
            formData.append('secret', user.uid); // User's secret Id

            getFile(user.photoURL)
                .then((avatar) => {
                    formData.append('avatar', avatar, avatar.name ) //User's image

                    //Call to ChatEngine API when user has to be created
                    axios.post('https://api.chatengine.io/users/',
                        formData,
                        { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                        
                    )
                    //If user creation is successfull
                    .then(() => setLoading(false))
                    //If user creation is not successfull
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    //If there is no user or we are currently loading 
    if(!user || loading) return 'Loading...';
    
    return (
        <div className="Chats-page">
            {/*------- Navigation Bar-------*/}
            <div className="nav-bar">
                <div className="logo-tab">
                    <img className="logo" src={logo} alt='logo'/>
                    <h3>Link Up</h3>
                </div>
                
                <div className="video-tab">
                <a target="_blank" href="https://link-up-video-call.netlify.app/">Video Call</a>
                </div>
                <div onClick={handleLogout} className="logout-tab">
                <a>Sign Out</a>
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
                
                {/* onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()} */}
        </div>
    );
}
export default Chats;