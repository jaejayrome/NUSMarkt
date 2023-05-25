import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {useState} from 'react'; 
import {auth} from '../../../config/firebase.js';
import Navbar from '../../compiledData/Navbar.js'
import Register from './Register.js';
import {signInWithEmailAndPassword} from 'firebase/auth'
function Signup() {

    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    
    const logInEmailHandler = () => {
        return (event) => setLoginEmail(event.target.value);
    }

    const logInPasswordHandler = () => {
        return (event) => setLoginPassword(event.target.value);
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = () => {

    }

    // visibility icon can be a button
    return (
        <div>


            <Navbar> </Navbar>

            <TextField id="user_email_add" 
            label="Email Address" 
            variant="outlined"
            required 
            size = "medium"
            onChange = {logInEmailHandler}
            inputProps={{placeholder: "Email"}}
            />

            <TextField id = "user_password"
            InputProps = {{
                endAdornment: (
                <InputAdornment position = "end">
                    <VisibilityIcon> </VisibilityIcon>
                </InputAdornment>
                )
            }}

            label = "Password"
            variant = "outlined"
            required 
            size = "medium"
            type = "password"
            onChange = {logInPasswordHandler}
            />

            <Button variant = "contained" type = "submit"  sx = {{backgroundColor: "black"}}>
            Submit
            </Button>


            <h4> Don't have an account?</h4>
            <Link to = "/REGISTER" element = {<Register />}> 
                <Button variant = "outlined" sx = {{color:"black", borderColor: "black"}}> Create Account </Button>
            </Link>

        </div>
    );
}

export default Signup;