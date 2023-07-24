import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../compiledData/Navbar.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"
import db from '../../../config/firebase.js';
import { auth } from '../../../config/firebase.js';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from "formik"
import * as Yup from 'yup';


  // ...import statements

function Register() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
  
    const navigate = useNavigate();
  
    const validationSchema = Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      userName: Yup.string().required('Username is required'),
      registerEmail: Yup.string()
        .email('Error: Invalid email address')
        .required('Email is required'),
      registerPassword: Yup.string().required('Password is required'),
      firstRePassword: Yup.string()
        .oneOf([Yup.ref('registerPassword')], 'Passwords must match')
        .required('Re-enter Password is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      telegramHandle: Yup.string().required('Telegram Handle is required'),
    });
  
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        userName: '',
        registerEmail: '',
        registerPassword: '',
        firstRePassword: '',
        phoneNumber: '',
        telegramHandle: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        handleRegistration(values);
      },
    });
  
    const handleRegistration = async () => {
        try {
        const user = await createUserWithEmailAndPassword(auth, formik.values.registerEmail, formik.values.registerPassword);
        const newUserRef = collection(db, "users")
        // whenever a user has registered, it's metadata would be sent to the users collleciton
        const newUser = {
            uid: user.user.uid, 
            registerEmail: formik.values.registerEmail,
            registerPassword: formik.values.registerPassword,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            userName: formik.values.userName,
            phoneNumber: formik.values.phoneNumber,
            telegramHandle: formik.values.telegramHandle,
            withdrawAmount: 0.00, 
            noTutorial: false
          }
        await addDoc(newUserRef, newUser)
        await navigate(`/TUTORIAL`)
        await updateProfile(auth.currentUser, {
            displayName: formik.values.userName
        })

        toast.success("You have successfully signed up")
        } catch (error) {
            toast.error("You have not completed the required fields!")
            console.log(error.message);
        }
    }

  
    const makePasswordVisible = () => {
      setVisible(prevState => !prevState);
    };
  
    const makePasswordVisible2 = () => {
      setVisible2(prevState => !prevState);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(user != null);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div>
        <Navbar />
  
        <p className='para'> CREATE ACCOUNT </p>
  
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column' }}>
            <Grid container align="center" justify="center" sx={{ width: '80%' }}>
              <Grid item xs={6}>
                <InputLabel htmlFor="user_first_name"> First Name </InputLabel>
                <TextField
                  id="user_first_name"
                  label="John"
                  variant="outlined"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  required
                  size="medium"
                  sx={{ width: 300, paddingRight: "0.5rem" }}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_last_name"> Last Name </InputLabel>
                <TextField
                  id="user_last_name"
                  label="Appleseed"
                  variant="outlined"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  required
                  size="medium"
                  sx={{ width: 300, paddingLeft: "0.5rem" }}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_username"> Username </InputLabel>
                <TextField
                  id="user_username"
                  label="username123"
                  variant="outlined"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.userName && formik.errors.userName}
                  helperText={formik.touched.userName && formik.errors.userName}
                  required
                  size="medium"
                  sx={{ width: 300 }}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_email_add"> Email Address </InputLabel>
                <TextField
                  id="user_email_add"
                  label="example@gmail.com"
                  variant="outlined"
                  name="registerEmail"
                  value={formik.values.registerEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.registerEmail && formik.errors.registerEmail}
                  helperText={formik.touched.registerEmail && formik.errors.registerEmail}
                  required
                  size="medium"
                  sx={{ width: 300 }}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_password"> Password </InputLabel>
                <TextField
                  id="user_password"
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {visible ?
                          <IconButton onClick={makePasswordVisible}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                          :
                          <IconButton onClick={makePasswordVisible}>
                            <VisibilityOffIcon></VisibilityOffIcon>
                          </IconButton>}
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.registerPassword}
                  label="password123"
                  variant="outlined"
                  name="registerPassword"
                  required
                  size="medium"
                  type={visible ? "text" : "password"}
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.registerPassword && formik.errors.registerPassword}
                  helperText={formik.touched.registerPassword && formik.errors.registerPassword}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_repassword"> Re-Enter Password </InputLabel>
                <TextField
                  id="user_repassword"
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {visible2 ?
                          <IconButton onClick={makePasswordVisible2}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                          :
                          <IconButton onClick={makePasswordVisible2}>
                            <VisibilityOffIcon></VisibilityOffIcon>
                          </IconButton>}
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.firstRePassword}
                  label="password123"
                  variant="outlined"
                  name="firstRePassword"
                  required
                  size="medium"
                  type={visible2 ? "text" : "password"}
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstRePassword && formik.errors.firstRePassword}
                  helperText={formik.touched.firstRePassword && formik.errors.firstRePassword}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_phoneNumber"> Phone Number </InputLabel>
                <TextField
                  id="user_phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  label="91234567"
                  variant="outlined"
                  name="phoneNumber"
                  required
                  size="medium"
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
  
              <Grid item xs={6}>
                <InputLabel htmlFor="user_telegramHandle"> Telegram Handle </InputLabel>
                <TextField
                  id="user_telegramHandle"
                  onChange={formik.handleChange}
                  value={formik.values.telegramHandle}
                  label="@telegramHandle"
                  variant="outlined"
                  name="telegramHandle"
                  required
                  size="medium"
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.telegramHandle && formik.errors.telegramHandle}
                  helperText={formik.touched.telegramHandle && formik.errors.telegramHandle}
                />
              </Grid>
            </Grid>
  
            {/* ...other JSX code */}
  
            <Button
              variant="outlined"
              disableRipple
              type="submit"
              size="large"
              sx={{
                marginTop: "5%",
                borderColor: "black",
                color: "black",
                backgroundColor: "transparent",
                '&hover': {
                  backgroundColor: "lightslategray"
                }
              }}
            >
              Register Now
            </Button>
          </div>
        </form>
      </div>
    )
  }
  
  export default Register;
  