import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'; 
import {auth} from '../../../config/firebase.js';
import Navbar from '../../compiledData/Navbar.js'
import Register from './Register.js';
import {signInWithEmailAndPassword} from 'firebase/auth'
import './Signup.css';
import InputLabel from '@mui/material/InputLabel';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// missing the current features: signout 
// auth.currentUser gives us the currentUser
// onAuthStateChanged triggers whatever is inside it whenever the auth variable changes:
// this means that the user authentication status has changed

// firebase would only store certain metadata about the user
// but then we want to store more data about the user 
// the reason why we use user uid is because we are afraid that the username might be the same


function Signup() {

    // const history = useHistory();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    // const onLogin = () => {
    //     toast("You have successfully signed in")
    // }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            await navigate(`/TUTORIAL`)
            toast("You have successfully signed in")
            
        } catch (error) {
            console.log(error)
            toast("You have keyed in wrong details")
        }
    }

    return (
        <div>

            <Navbar> </Navbar>

         <div style = {{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center"}}> 
            <h2 style = {{textAlign: "left"}}> Login </h2>

            <InputLabel htmlFor = "user_email_add"
            
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
            style = {{marginTop: "30px"}}
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

            <Button variant = "outlined" type = "submit"  sx = {{ borderColor: "black", color: "black", marginTop: "2%"
            }}  onClick = {login}>
            Login
            </Button>
        

            <h4 className = "email" style = {{marginTop: "3%"}}> Don't have an account? </h4>
            <Link to = "/REGISTER" element = {<Register />}> 
                <Button variant = "outlined" sx = {{marginTop: "5px", color:"black", borderColor: "black"}}
                size = "large"
                className = "email"> Create Account </Button>
            </Link>
        </div>
        </div>
    );
}

export default Signup;