import {useState} from 'react';
import Navbar from '../../compiledData/Navbar.js';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../config/firebase.js';
import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

function Register() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [currentUser, setUser] = useState({email: "", password: ""});


    const registerEmailHandler = (event) => setRegisterEmail(event.target.value);

    const registerPasswordHandler = (event) => setRegisterPassword(event.target.value);

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

            <TextField id="user_email_add" 
            label="Email Address" 
            variant="outlined"
            value = {registerEmail}
            required 
            size = "medium"
            onChange = {registerEmailHandler}
            inputProps={{placeholder: "Email"}}
            />

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
            label = "Password"
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