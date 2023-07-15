import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'; 
import {auth, provider} from '../../../config/firebase.js';
import Navbar from '../../compiledData/Navbar.js'
import Register from './Register.js';
import {signInWithEmailAndPassword} from 'firebase/auth'
import './Signup.css';
import InputLabel from '@mui/material/InputLabel';
import {toast} from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { query, where, getDocs, addDoc, collection } from '@firebase/firestore';
import db from "../../../config/firebase.js"

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

    const googleSignIn = async () => {
        signInWithPopup(auth, provider).then(async (result) => {

            // check whether user has an exisitng account before 
            const collectionRef = collection(db, "users")
            const q = query(collectionRef, where("uid", "==", result.user.uid))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                // means the user doesn't exist
                // create a user

                const firstName = prompt("Please enter your first name:");
                const lastName = prompt("Please enter your last name:");
                const telegramHandle = prompt("Please enter your Telegram Handle:");
                const userName = result.user.displayName
                const email = result.user.email
                const phoneNumber = result.user.phoneNumber

                const newUser = {
                    firstName: firstName, 
                    lastName: lastName, 
                    telegramHandle: telegramHandle, 
                    userName: userName, 
                    registerEmail: email, 
                    phoneNumber: phoneNumber, 
                    uid: result.user.uid
                }

                await addDoc(collectionRef, newUser)
            }

            await navigate('/BUY')



        }).catch((error) => {
            console.log(error)
        })
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

            <Button onClick={googleSignIn}> 
                Sign In With Google
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