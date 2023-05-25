import {useState} from 'react';
import Navbar from '../../compiledData/Navbar.js';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../config/firebase.js';
import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

function Register() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [currentUser, setUser] = useState({firstName: "", email: "", password: ""});

    const registerEmailHandler = (event) => setRegisterEmail(event.target.value);
    const registerPasswordHandler = (event) => setRegisterPassword(event.target.value);
    const firstNameHandler = (event) => setFirstName(event.target.value);
    const lastNameHandler = (event) => setLastName(event.target.value);

    const userHandler = () => {
        setUser(currentUser)
    }

    const register = async () => {

        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        } catch (error) {
            console.log(error.message);
        }
    }



    return (
        <div> 
            <Navbar />
            <p style = {{fontSize:"30px"}}> Create Account </p>

            {/*
            <p> Gender </p>

            <p> Date of Birth </p> */}

            
            <InputLabel htmlFor = "user_first_name"> First Name </InputLabel>
            <TextField id="user_first_name" 
            label="Sok Yang" 
            variant="outlined"
            value = {firstName}
            required 
            size = "medium"
            onChange = {firstNameHandler}
            />

            <InputLabel htmlFor = "user_last_name"> Last Name </InputLabel>
            <TextField id="user_last_name" 
            label="Whang" 
            variant="outlined"
            value = {lastName}
            required 
            size = "medium"
            onChange = {lastNameHandler}
            />

            <InputLabel htmlFor = "user_email_add"> Email Address </InputLabel>
            <TextField id="user_email_add" 
            label="example@gmail.com" 
            variant="outlined"
            value = {registerEmail}
            required 
            size = "medium"
            onChange = {registerEmailHandler}
            // inputProps={{placeholder: "Email"}}
            />


            <InputLabel htmlFor = "user_password"> Password </InputLabel>
            <TextField id = "user_password"
            onChange = {registerPasswordHandler}
            InputProps = {{
                endAdornment: (
                <InputAdornment position = "end">
                    <VisibilityIcon> </VisibilityIcon>
                </InputAdornment>
                )
            }}
            value = {registerPassword}
            label = "password123"
            variant = "outlined"
            required 
            size = "medium"
            type = "password"
            />


            <Button variant = "contained" type = "submit"  sx = {{backgroundColor: "black"}} onClick = {register}>
            Register Now
            </Button>
        </div>
    )
}

export default Register;