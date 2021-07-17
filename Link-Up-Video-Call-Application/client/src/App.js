//Importing Files
import React  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Room from './components/Room/Room'
import styled from 'styled-components';

// Main function of the application
// Routes of different pages of the app are mentioned for use in the react application
function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/room/:roomId" component={Room} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}

/*----------- Styled Components ----------*/
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  // color: white;
  // background-color: #454552;
  // background: linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%);
  background-image: linear-gradient( #3fbaeb, #5340ff);
  // background-image: linear-gradient( #75d4fa, #877af7);
  text-align: center;
`;

export default App;
