/*-------------Importing Files------------------*/
//Importing React
import React, { useEffect } from "react"
//Importing files from reach-router-dom
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom"
//Importing AuthProvider
import { AuthProvider, useAuth } from "../contexts/AuthContext"
//Importing Components 
import Chats from "./Chats"
import Login from "./Login"

function App() {
  // const auth = useAuth();
  // useEffect(() => {
  // console.log('debug >', auth)
  // }, [auth])
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Login} />  
            <Route exact path="/chats" component={Chats} />
            {/* <Route exact path="/video" component={Main} /> */}
            {/* <Route exact path="/room/:roomId" component={Room}/> */}
            {/* isAuthenticated={auth.user} */}
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}


export default App
