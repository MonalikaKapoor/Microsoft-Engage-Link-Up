//Importing React
import React, { useContext, useState, useEffect } from 'react';
//Importing History
import { useHistory } from 'react-router-dom';
//Importing the auth object created in firebase.js
import { auth } from '../firebase';

//Create Context
const AuthContext = React.createContext();


//Create export
export const AuthProvider = ({ children }) => {
    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);
    // const history = useHistory();

    // //Set useEffect ( a function that accepts another callback function as its first parameter and a second parameter which is called a dependency array)
    // useEffect(() => {
    //     //Function that gives us user data
    //     auth.onAuthStateChanged((user) => {
    //         setUser(user); //Data set to setUser
    //         setLoading(false); //As we are no longer loading
    //         // if(user) history.push('/chats'); 
    //         //To renavigate us to our chat application only if we have the user
    //     })
    // }, [user, history]); //When things in dependency array changes (user object or history) then this whole callback function will be recalled)
    const auth = useProvideAuth();
    // const value = { user };

    return (
        <AuthContext.Provider value = {auth}>
            {/* If we are not loading then show the children */}
            {!auth.loading && children} 
        </AuthContext.Provider>
    )
}
//Function to export our Context
export const useAuth = () => useContext(AuthContext);

function useProvideAuth(){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    //Set useEffect ( a function that accepts another callback function as its first parameter and a second parameter which is called a dependency array)
    useEffect(() => {
        //Function that gives us user data
        auth.onAuthStateChanged((user) => {
            setUser(user); //Data set to setUser
            setLoading(false); //As we are no longer loading
            if(user) history.push('/chats'); 
            //To renavigate us to our chat application only if we have the user
        })
    }, [user, history]); //When things in dependency array changes (user object or history) then this whole callback function will be recalled)

    return { user, loading };
}