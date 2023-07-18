import React from 'react';
import styled, { keyframes, css, createGlobalStyle} from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useEffect, useState } from 'react';



const gradientAnimation = keyframes`
  0% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 50%
    }
  100% {
    background-position: 100% 0%;
  }
`;

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bondoni FLF';
    src: url('../../../public/fonts/BodoniFLF-Roman.ttf') format('truetype'); 
  }
  * {
  margin: 0;
  padding: 0;
  }

  box-sizing: border-box;
`;




const Container = styled.div`
position: absolute;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
color: rgb(255, 255, 255);
background: background: rgb(11,10,10);
background: linear-gradient(90deg, rgba(10,10,10,1) 30%, rgba(249,243,243,1) 50%, rgba(3,3,3,1) 70%);;
background-size: 400% 400%;
animation: ${gradientAnimation} 5s ease infinite;
${props => props.paused && css`
  animation-play-state: paused;
`}
margin: 0 !important;
padding: 0 !important;
`;

const Heading = styled.h1`
  font-family: 'Bondoni FLF';
  font-weight: 600;
  text-align: center;
  margin: 0;
  font-size: 80px;
`;

const Subheading = styled.div`
  font-family: 'Bondoni FLF';
  font-weight: 300;
  text-align: center;
  font-size: 30px;
`;

const Subheading2 = styled.div`
  font-family: 'Bondoni FLF';
  font-weight: 300;
  text-align: center;
  font-size: 30px;
`;


const BeforeHeading = styled.div`
font-family: 'Bondoni FLF';
font-weight: 300;
text-align: center;
font-size: 40px;
`

const ButtonText = styled.div`
font-family: 'Bondoni FLF';
font-weight: 300;
text-align: center;
font-size: 20px;
`

export default function Application(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const navigator = () => {
        if (isLoggedIn) {
            navigate('/BUY')
        } else {
        navigate('/SIGNUP')
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
    
          try {
            setIsLoggedIn(user !== null);
          }catch(error) {
          console.log(error)
          }
    
        
    })

    return () => unsubscribe();}
    , []);


    return (

      
        <Container>
            <GlobalStyles></GlobalStyles>
       
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
            <BeforeHeading> Welcome To </BeforeHeading>
            <Heading>NUSMarkt</Heading>
            {/* <Subheading2> EST 2023</Subheading2> */}
            <Subheading> BUY . SELL . TRADE </Subheading>

            <Button onClick = {navigator} sx= {{mt: '2%',textTransform: 'none', color: "white"}}> <ButtonText> Enter Site </ButtonText></Button>
          </div>
        </Container>

    );
  }


