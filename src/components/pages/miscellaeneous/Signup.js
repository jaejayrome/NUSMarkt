import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'; 
import {auth} from '../../../config/firebase.js';
import Navbar from '../../compiledData/Navbar.js'
import Register from './Register.js';
import {signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import './Signup.css';
import InputLabel from '@mui/material/InputLabel';

// missing the current features: signout 
// auth.currentUser gives us the currentUser
// onAuthStateChanged triggers whatever is inside it whenever the auth variable changes:
// this means that the user authentication status has changed

// firebase would only store certain metadata about the user
// but then we want to store more data about the user 

function Signup() {

    // const history = useHistory();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({loggedIn: false, email: "", password: ""})

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            alert ("You have succesfully signed in using \n Email Address: " + loginEmail  + "\n Password:" + loginPassword )
        } catch (error) {
            alert("Invalid email address or password \n Please Try Again.")
        }
    }

    // onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) {
    //         setUser({...currentUser, loggedIn: true});
    //         history.push("/BUY")
    //     }
    // })

    return (
        <div>

            <Navbar> </Navbar>

            <h3 className='login'> Login </h3>

            <InputLabel htmlFor = "user_email_add"
            style = {{left: "41%" ,top: "100px"}}
            > Email Address </InputLabel>
            <TextField id="user_email_add" 
            variant="outlined"
            required 
            size = "medium"
            onChange = {event => setLoginEmail(event.target.value)}
            className = "email" 
            sx = {{width: 300}}
            />

            <InputLabel htmlFor = "user_password"
            style = {{marginTop: "30px", left: "41%" ,top: "100px"}}
            > Password </InputLabel>
            <TextField id = "user_password"
            InputProps = {{
                endAdornment: (
                <InputAdornment position = "end">
                    <VisibilityIcon> </VisibilityIcon>
                </InputAdornment>
                )
            }}

            variant = "outlined"
            required 
            size = "medium"
            type = "password"
            onChange = {event => setLoginPassword(event.target.value)}
            className = "email"
            sx = {{width: 300}}
            />

            <Button variant = "outlined" type = "submit"  sx = {{top: "170px", left: "22.5%",  borderColor: "black", color: "black", margin: "10px"
            }} size = "large" onClick = {login}>
            Login
            </Button>


            <h4 className = "email" style = {{marginTop: "80px"}}> Don't have an account? </h4>
            <Link to = "/REGISTER" element = {<Register />}> 
                <Button variant = "outlined" sx = {{marginTop: "5px", color:"black", borderColor: "black"}}
                size = "large"
                className = "email"> Create Account </Button>
            </Link>
        </div>
    );
}

export default Signup;