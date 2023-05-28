import {useState} from 'react';
import Navbar from '../../compiledData/Navbar.js';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../config/firebase.js';
import  TextField   from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';


function Register() {

    // current user
    const user = auth.currentUser;

    // all the use states 
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [firstRePassword, setRePassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [telegramHandle, setTelegramHandle] = useState("")
    const [currentUser, setUser] = useState({firstName: "", email: "", password: ""});

    // all the handers
    const registerEmailHandler = (event) => setRegisterEmail(event.target.value);
    const registerPasswordHandler = (event) => setRegisterPassword(event.target.value);
    const firstNameHandler = (event) => setFirstName(event.target.value);
    const lastNameHandler = (event) => setLastName(event.target.value);
    const userNameHandler = (event) => setUserName(event.target.value);
    const rePasswordHandler = (event) => setRePassword(event.target.value);
    const  phoneNumberHandler= (event) => setPhoneNumber(event.target.value);
    const telegramHandleHandler = (event) => setTelegramHandle(event.target.value);

    // need to set another function that checks whether the password and the re-enter password is the same 
    // const userHandler = () => {
    //     setUser(currentUser)
    // }

    const register = async () => {

        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        alert("Successfully signed in!" + " " + registerEmail +  " " + registerPassword)
        } catch (error) {
            console.log(error.message);
        }
    }

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const checkWhetherPasswordAreTheSame = () => {
        return firstRePassword == registerPassword;
    }

    const firstPropName = <InputLabel htmlFor = "user_first_name"> First Name </InputLabel>



    return (
        <div> 
            <Navbar />
            <p className='para'> CREATE ACCOUNT </p>



            <Grid container align = "center" justify = "center" sx = {{width: '80%'}}>
                <Grid item xs={6}>
                <InputLabel htmlFor = "user_first_name"> First Name </InputLabel>
                <TextField id="user_first_name" 
                    label="John" 
                    variant="outlined"
                    value = {firstName}
                    required 
                    size = "medium"
                    onChange = {firstNameHandler}
                    sx = {{width: 300, paddingRight: "0.5rem"}}
                />
                </Grid>

                <Grid item xs={6}>
                <InputLabel htmlFor = "user_last_name"> Last Name </InputLabel>
                <TextField id="user_last_name" 
                    label="Appleseed" 
                    variant="outlined"
                    value = {lastName}
                    required 
                    size = "medium"
                    onChange = {lastNameHandler}
                    sx = {{width: 300, paddingLeft: "0.5rem"}}
                />
                </Grid>
                
                <Grid item xs={6}>
                <InputLabel htmlFor = "user_username"> Username </InputLabel>
                <TextField id="user_username" 
                    label="username123" 
                    variant="outlined"
                    value = {userName}
                    required 
                    size = "medium"
                    onChange = {userNameHandler}
                    sx = {{width: 300}}
                />
                </Grid>

                <Grid item xs={6}>
                <InputLabel htmlFor = "user_email_add"> Email Address </InputLabel>
                <TextField id="user_email_add" 
                    label="example@gmail.com" 
                    variant="outlined"
                    value = {registerEmail}
                    required 
                    size = "medium"
                    onChange = {registerEmailHandler}
                    sx = {{width: 300}}
                />
                </Grid>

                <Grid item xs={6}>
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
                    sx = {{width: 300}}
                />
                </Grid>

                <Grid item xs={6}>
                <InputLabel htmlFor = "user_repassword"> Re-Enter Password </InputLabel>
                <TextField id = "user_repassword"
                    onChange = {rePasswordHandler}
                    InputProps = {{
                        endAdornment: (
                        <InputAdornment position = "end">
                            <VisibilityIcon> </VisibilityIcon>
                        </InputAdornment>
                        )
                    }}
                    value = {firstRePassword}
                    label = "password123"
                    variant = "outlined"
                    required 
                    size = "medium"
                    type = "password"
                    sx = {{width: 300}}
                />
                </Grid>

                <Grid item xs={6}>
                <InputLabel htmlFor = "user_phoneNumber"> Phone Number </InputLabel>
                <TextField id = "user_phoneNumber"
                    onChange = {phoneNumberHandler}
                    value = {phoneNumber}
                    label = "91234567"
                    variant = "outlined"
                    required 
                    size = "medium"
                    sx = {{width: 300}}
                />
                </Grid>

                <Grid item xs={6}>
                <InputLabel htmlFor = "user_telegramHandle"> Telegram Handle </InputLabel>
                <TextField id = "user_telegramHandle"
                    onChange = {telegramHandleHandler}
                    value = {telegramHandle}
                    label = "password123"
                    variant = "outlined"
                    required 
                    size = "medium"
                    sx = {{width: 300}}
                />   
                </Grid>
            
            </Grid>

            <Button variant = "outlined" 
            disableRipple
            type = "submit" size = "large" sx = {{borderColor: "black", color: "black", backgroundColor: "transparent", top: "50px",left: "36%", '&hover': {
                backgroundColor: "lightslategray"
            }}}
            onClick = {register}>
            Register Now
            </Button>
        </div>
    )
}

export default Register;