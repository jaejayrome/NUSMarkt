import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'; 
import {auth} from '../../../config/firebase.js';
import { provider, fbProvider } from '../../../config/firebase.js';
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
import google from "../../../images/real_google.png"
import facebook from "../../../images/facebook2.png"
import { IconButton, Typography } from '@mui/material';
import Metadata from './Metadata.js';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
    const [phoneNumbera, setPhoneNumber] = useState(null)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [telegramHandle, setTelegramHandle] = useState("")
    const [showPassword, setShow] = useState(false)


    // const onLogin = () => {
    //     toast("You have successfully signed in")
    // }

    const handleMetaData = (firstName, lastName, telegramHandle) => {
        setFirstName(firstName)
        setLastName(lastName)
        setTelegramHandle(telegramHandle)
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            const collectionRef = collection(db, "users")
            const q = query(collectionRef, where("uid", "==", user.user.uid))
            const snapshot = await getDocs(q)

            if (snapshot) {
                snapshot.forEach(async (user) => {
                    const noTutorial = user.data().noTutorial
                    if (noTutorial) {
                        await navigate('/BUY')
                        toast.success("You have successfully signed in")
                    } else {
                        await navigate('/TUTORIAL')
                        toast.success("You have successfully signed in")
                    }
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("You have keyed in wrong details")
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

                const userName = result.user.displayName
                const email = result.user.email
                const phoneNumber = result.user.phoneNumber

                const newUser = {
                    userName: userName, 
                    registerEmail: email, 
                    phoneNumber: phoneNumber, 
                    uid: result.user.uid,
                    noTutorial: false,
                    withdrawAmount: 0.00
                }

                navigate('/METADATA', { state: { newUser: newUser } });
            } else {
                snapshot.forEach(async (user) => {
                    const noTutorial = user.data().noTutorial
                    if (noTutorial) {
                        await navigate('/BUY')
                        toast.success("You have successfully signed in")
                    } else {
                        await navigate('/TUTORIAL')
                        toast.success("You have successfully signed in")
                    }
                })
            }
            
            



        }).catch((error) => {
            console.log(error)
        })
    }

    const facebookSignIn = async () => {
        signInWithPopup(auth, fbProvider)
        .then(async (result) => {
            // check whether user has an exisitng account before 
            const collectionRef = collection(db, "users")
            const q = query(collectionRef, where("uid", "==", result.user.uid))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                const userName = result.user.displayName
                const email = result.user.email
                const phoneNumber = result.user.phoneNumber

                const newUser = {
                    userName: userName, 
                    registerEmail: email, 
                    phoneNumber: phoneNumber, 
                    uid: result.user.uid,
                    noTutorial: false,
                    withdrawAmount: 0.00
                }

                navigate('/METADATA', { state: { newUser: newUser } });
            } else {
                snapshot.forEach(async (user) => {
                    const noTutorial = user.data().noTutorial
                    if (noTutorial) {
                        await navigate('/BUY')
                        toast.success("You have successfully signed in")
                    } else {
                        await navigate('/TUTORIAL')
                        toast.success("You have successfully signed in")
                    }
                })
            }
            
        })
        .catch((error) => console.log(error))
    }

    const showPasswordHandler = () => {
        setShow(prevState => !prevState)
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
                    {showPassword ? <IconButton onClick = {showPasswordHandler}>
                    <VisibilityIcon> </VisibilityIcon>
                    </IconButton> :
                    <IconButton onClick = {showPasswordHandler}>
                    <VisibilityOffIcon> </VisibilityOffIcon>
                    </IconButton>}

                </InputAdornment>
                )
            }}

            variant = "outlined"
            required 
            size = "medium"
            type = {showPassword ? "text" : "password"}
            onChange = {event => setLoginPassword(event.target.value)}
            className = "email"
            sx = {{width: 300}}
            />

            <Button variant = "outlined" type = "submit"  sx = {{ borderColor: "black", color: "black", marginTop: "2%"
            }}  onClick = {login}>
            Login
            </Button>

            <div sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
            <Button variant = "outlined" sx = {{borderColor: "black", color: "black", mt : "10%", textTransform: 'none', fontSize: '15px'}} startIcon={<img width="80%" style={{marginRight: '-100px'}} height="30%" src={google} alt="GOOGLE" />} onClick={googleSignIn}>
                Continue With Google
            </Button>
            </div>

            <div style={{marginTop: "1%"}}> 
                <Button startIcon = {<img width="60%" style={{marginRight: '-663px'}} height="30%" src={facebook} alt="FACEBOOK" />} variant = "contained" sx = {{backgroundColor: '#3b5998',textTransform: 'none'}} onClick = {facebookSignIn}> 
                 Continue With Facebook
                </Button>
            </div>

            <h4 className = "email" style = {{marginTop: "3%"}}> Don't have an account? </h4>
            <Link to = "/REGISTER" element = {<Register />}> 
                <Button  variant = "outlined" sx = {{marginTop: "5px", color:"black", borderColor: "black"}}
                size = "large"
                className = "email"> Create Account </Button>
            </Link>
        </div>
        </div>
    );
}

export default Signup;