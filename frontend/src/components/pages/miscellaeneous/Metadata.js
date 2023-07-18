import { List, ListItem, Box, InputLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../../../config/firebase.js"
import { collection, addDoc } from "@firebase/firestore";
import {toast} from 'react-toastify';
import Navbar from "../../compiledData/Navbar.js";
import styled, {createGlobalStyle} from 'styled-components'

const StyledTitle = styled.div`
font-family: 'Bondoni FLF';
font-weight: 400; 
font-size: 40px;
`

const StyledTitle2 = styled.div`
font-family: 'Bondoni FLF';
font-weight: 400; 
font-size: 20px;
`

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bondoni FLF';
    src: url('../../../public/fonts/BodoniFLF-Roman.ttf') format('truetype'); 
  }
`;

export default function Metadata(props) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [telegramHandle, setTelegramHandle] = useState("")
    const collectionRef = collection(db, "users")
    const location = useLocation()
    const navigate = useNavigate()

    const firstNameHandler = (event) => {
        setFirstName(event.target.value)
    }

    const lastNameHandler = (event) => {
        setLastName(event.target.value)
    }

    const telegramHandleHandler = (event) => {
        setTelegramHandle(event.target.value)
    }



    const addUser = async () => {
        try {

            const updatedUser = {
                firstName: firstName, 
                lastName: lastName, 
                telegramHandle: telegramHandle, 
                userName: location.state.newUser.userName, 
                registerEmail: location.state.newUser.registerEmail, 
                phoneNumber: location.state.newUser.phoneNumber, 
                uid: location.state.newUser.uid,
                noTutorial: location.state.newUser.noTutorial
            }
            await addDoc(collectionRef, updatedUser)
            await navigate('/TUTORIAL')
            toast.success("You have successfully signed in")
        } catch (error) {
            toast.error("There is some error!")
            console.log(error)
        }
    }
    return (
        <div> 

            <Navbar/>
            <GlobalStyles />

            <div style = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
            <StyledTitle>
            You are almost there!
            </StyledTitle>

            <StyledTitle2> 
            We just need you to fill in the following details: 
            </StyledTitle2>
            </div>
            
            <Box> 
                <List> 
                    <ListItem sx = {{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
                    <InputLabel htmlFor = "firstName"> Enter Your First Name</InputLabel>
                    <TextField   sx={{ width: 500 }} id="firstName" type = 'text' required value = {firstName} onChange = {firstNameHandler}>  </TextField>

              
                    </ListItem>

                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>  
                    <InputLabel htmlFor = "firstName1"> Enter Your Last Name</InputLabel>
                    <TextField sx={{ width: 500 }} id="firstName1" type = 'text' required value={lastName} onChange={lastNameHandler}> </TextField>
                    </ListItem>


                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
                    <InputLabel htmlFor = "firstName2"> Enter Your Telegram Handle</InputLabel>
                    <TextField sx={{ width: 500 }} id="firstName2" type = 'text' required value = {telegramHandle} onChange={telegramHandleHandler}> </TextField>
                    </ListItem>


                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>  
                        <Button variant = "outlined" sx = {{color:"black", borderColor: "black"}} onClick = {addUser}> Submit </Button>
                    </ListItem>
                </List>

            </Box>
        </div>
    )
}