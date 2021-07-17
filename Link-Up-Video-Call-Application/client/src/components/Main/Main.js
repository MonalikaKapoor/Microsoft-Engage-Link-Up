//Main.js contains the js for the main login page for the video call where the user enters the username and room name

/*----------Importing Files----------*/
//Importing React
import React, { useRef, useState, useEffect } from 'react';
//Importing styled components
import styled from 'styled-components';
//Importing socket
import socket from '../../socket';
//Importing logo image
import logo from './logo1.png';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    //Check if user already exists that is there is already a user with the same name in the room
    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value; 
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist'); //Show error message
      }
    });
  }, [props.history]);

  //Function to join the room
  function clickJoin() {
    const roomName = roomRef.current.value; //Putting the current room and username values
    const userName = userRef.current.value;

    //To show error message when there's either no room name or username
    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else { //If both exists then check user 
      socket.emit('BE-check-user', { roomId: roomName, userName });
      console.log('checkuser')
    }
  }

  return (
    <Container>
      <MainContainer>
        <Row>
          <Logo><img className="img" src={logo} alt='logo'/></Logo>
        </Row>
        <Row>
          <Label htmlFor="roomName">Room Name</Label>
          <Input type="text" id="roomName" placeholder="Enter Room Name" ref={roomRef} />
        </Row>
        <Row>
          <Label htmlFor="userName">User Name</Label>
          <Input type="text" id="userName" placeholder="Enter Your Name" ref={userRef} />
        </Row>
        <JoinButton onClick={clickJoin}> Join </JoinButton>
        {err ? <Error>{errMsg}</Error> : null}
      </MainContainer>
      <Copyright>
        <p>Copyright © 2021 by Monalika Kapoor</p>
      </Copyright>
    </Container>
  );
};

/*----------- Styled Components ----------*/
const Container = styled.div`
padding: 0px;
margin: 0px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: solid 2px #ffffff;
  border-radius: 20px;
  width: 300px;
  background: white;
  padding: 40px 40px;
  box-shadow: 2px 3px #23cde4;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;
const Logo = styled.div`
  display: flex;
  text-align: center;
  float:left;
  font-weight: bold
  color: rgb(58, 32, 99);
  font-size: 40px;
  margin-left: 0;
`;
const Label = styled.label`
font-weight: bold
color: black;
color: grey;
`;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: 1px solid silver;
  border-radius: 5px;
  

  :focus {
  border: solid 2px #00ffc3;
  border-bottom-width: 2px;
  color: grey;
  }
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  width: 100px;
  margin: 35px 90px 10px 100px;
  
  outline: none;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  background-color: #05b8ff;
  font-size: 25px;
  font-weight: 500;
  transition: all 0.4s;

  :hover {
    background-color: #047dc4;
    cursor: pointer;
    border: solid 5px #047dc4;

  }
`;

const Copyright = styled.div`
    color: white;
    margin-top: 70px;
    font-size: 12px;

`;

export default Main;
