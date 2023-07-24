import { List, ListItem, Box, InputLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../../../config/firebase.js"
import { collection, addDoc } from "@firebase/firestore";
import {toast} from 'react-toastify';
import Navbar from "../../compiledData/Navbar.js";
import styled, {createGlobalStyle} from 'styled-components'
import { useFormik } from "formik";
import * as Yup from 'yup';

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

    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [telegramHandle, setTelegramHandle] = useState("")
    const collectionRef = collection(db, "users")
    const location = useLocation()
    const navigate = useNavigate()

    // const firstNameHandler = (event) => {
    //     setFirstName(event.target.value)
    // }

    // const lastNameHandler = (event) => {
    //     setLastName(event.target.value)
    // }

    // const telegramHandleHandler = (event) => {
    //     setTelegramHandle(event.target.value)
    // }



    const addUser = async () => {
        try {

            const updatedUser = {
                firstName: formik.values.firstName, 
                lastName: formik.values.lastName, 
                telegramHandle: formik.values.telegramHandle, 
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

    const schema = Yup.object({
        firstName: Yup.string().required("First Name is required!"),
        lastName: Yup.string().required("Last Name is required!"),
        telegramHandle: Yup.string().required("Telegram Handle is required!")
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            telegramHandle: ''
        }, 
        validationSchema: schema, 
        onSubmit: (values) => addUser(values)
    })
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
                <form onSubmit={formik.handleSubmit}> 
                <List> 
                    <ListItem sx = {{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
                    <InputLabel htmlFor = "firstName"> Enter Your First Name</InputLabel>
                    <TextField   sx={{ width: 500 }}    
                    value = {formik.values.firstName}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    
                    id="firstName" type = 'text' required>  </TextField>

              
                    </ListItem>

                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>  
                    <InputLabel htmlFor = "lastName"> Enter Your Last Name</InputLabel>
                    <TextField sx={{ width: 500 }}    
                    value = {formik.values.lastName}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    
                    id="lastName" type = 'text' required > </TextField>
                    </ListItem>


                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> 
                    <InputLabel htmlFor = "telegramHandle"> Enter Your Telegram Handle</InputLabel>
                    <TextField sx={{ width: 500 }}    value = {formik.values.telegramHandle}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.telegramHandle && formik.errors.telegramHandle}
                    helperText={formik.touched.telegramHandle && formik.errors.telegramHandle}
                    
                    id="telegramHandle" type = 'text' required > </TextField>
                    </ListItem>


                    <ListItem sx = {{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>  
                        <Button variant = "outlined" sx = {{color:"black", borderColor: "black"}} type="submit"> Submit </Button>
                    </ListItem>
                </List>
                </form>

            </Box>
        </div>
    )
}