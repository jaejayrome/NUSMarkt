import { Button, Drawer, Box,Avatar, IconButton, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import {TextField} from "@mui/material"
import {getDoc, doc, updateDoc, arrayUnion, collection, addDoc} from 'firebase/firestore'
import db from "../../config/firebase.js"
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useFormik } from "formik";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import * as Yup from 'yup'

export default function UpdateProfileDrawer(props) {
    const [visible, setVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messageContent, setContent] = useState("");
    const [loading, setLoading] = useState(true)
    const [click, setClick] = useState(false)
    const navigate = useNavigate()

    const schema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        userName: Yup.string().required('Username is required'),
        // registerEmail: Yup.string()
        //   .email('Error: Invalid email address')
        //   .required('Email is required'),
        // registerPassword: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        telegramHandle: Yup.string().required('Telegram Handle is required'),
      });

    const formik = useFormik({
      initialValues: {
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        userName: props.user.userName,
        // registerEmail: props.user.registerEmail,
        // registerPassword: props.user.registerPassword,
        // firstRePassword: '',
        phoneNumber: props.user.phoneNumber,
        telegramHandle: props.user.telegramHandle,
      },
      validationSchema: schema,
      onSubmit: (values) => {
        uploadReview(values);
      },
    });

    const [firstNameEdit, setFirstNameEdit] = useState(false)
    const [lastNameEdit, setLastNameEdit] = useState(false)
    const [userNameEdit, setUserNameEdit] = useState(false)
    const [phoneNumberEdit, setPhoneNumberEdit] = useState(false)
    const [passwordEdit, setPasswordEdit] = useState(false)
    const [telegramHandleEdit, setTelegramHandleEdit] = useState(false)
    const [emailAddressEdit, setEmailAddressEdit] = useState(false)

    const showFirstNameEdit = () => {
        setFirstNameEdit(prevState => !prevState)
    }

    const showLastNameEdit = () => {
        setLastNameEdit(prevState => !prevState)
    }

    const showUserNameEdit = () => {
        setUserNameEdit(prevState => !prevState)
    }

    const showPhoneNumberEdit = () => {
        setPhoneNumberEdit(prevState => !prevState)
    }

    const showPasswordEdit = () => {
        setPasswordEdit(prevState => !prevState)
    }

    const showTelegramHandleEdit = () => {
        setTelegramHandleEdit(prevState => !prevState)
    }

    const showEmailAddressEdit = () => {
        setEmailAddressEdit(prevState => !prevState)
    }


    const makePasswordVisible = () => {
        setVisible(prevState => !prevState);
    };

    // new user that is being updated
    // that would not contain the password but the 
    const newUser = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        telegramHandle: formik.values.telegramHandle,
        phoneNumber: formik.values.phoneNumber,
        // registerEmail: formik.values.registerEmail,
        userName: formik.values.userName
    }

    
   
    const uploadReview = async () => {
        try {
           await updateDoc(doc(db, `users/${props.id}`), newUser).then((data) =>{
            toast.success("You have updated your details!")
           setIsOpen(false)
           }).catch(error => console.log(error)) 
          
        } catch(error) {
            console.log(error)
        }
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

   

  
    return (
        <div>
            <Button onClick = {toggleDrawer} startIcon = {<SyncAltIcon />} variant = "outlined" sx = {{borderColor: "black", color: 'black'}}> Update Profile </Button>
        
            <Drawer PaperProps={{
            sx: { width: "100%", height: "80%",borderRadius: "25px"},
            }}
            anchor="top" open={isOpen} onClose={toggleDrawer}>

            <form onSubmit={formik.handleSubmit}>


            <div style = {{marginTop: "5%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",marginBottom: "3%", fontSize: "30px"}}> 
            What do you want to edit? 
            <div style={{marginTop: "1%", fontSize: "15px"}}> 
                Click on any buttons below to start
            </div>
            </div>
            <div style = {{flexDirection: "column",display: "flex", justifyContent: "center", alignItems: "center"}}> 

            <Grid container align="center" justify="center" sx={{ width: '80%' }} rowSpacing={10}>
              <Grid item xs={4}>
                <Button  sx = {{color: "black", borderColor: 'black'}} onClick = {showFirstNameEdit}> First Name</Button> 

                {firstNameEdit ? (
                <div> 
                {/* <InputLabel htmlFor="user_first_name"> First Name </InputLabel> */}
                <TextField
                  id="user_first_name"
                //   label="John"
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
                </div>) : <div> </div>}
                
              </Grid>
  
              <Grid item xs={4}>
              <Button sx = {{color: "black", borderColor: 'black'}} onClick = {showLastNameEdit}> Last Name</Button> 
                {lastNameEdit ? 
                <div> 
                {/* <InputLabel htmlFor="user_last_name"> Last Name </InputLabel> */}
                <TextField
                  id="user_last_name"
                //   label="Appleseed"
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
                </div> : 
                <div> 
                </div> }
              </Grid>
  
              <Grid item xs={4}>
              <Button sx = {{color: "black", borderColor: 'black'}} onClick = {showUserNameEdit}> Username</Button> 

                {userNameEdit ? 
                <div>  
                {/* <InputLabel htmlFor="user_username"> Username </InputLabel> */}
                <TextField
                  id="user_username"
                //   label="username123"
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
                </div>
                :
                <div> </div>
                }
              </Grid>
  
              
              <Grid item xs={6}>
              <Button  sx = {{color: "black", borderColor: 'black'}} onClick = {showPhoneNumberEdit}> Phone Number </Button> 
                {phoneNumberEdit ? 
                <div> 
                {/* <InputLabel htmlFor="user_phoneNumber"> Phone Number </InputLabel> */}
                <TextField
                  id="user_phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                //   label="91234567"
                  variant="outlined"
                  name="phoneNumber"
                  required
                  size="medium"
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                </div> : <div> </div>}
              </Grid>
              
  
              <Grid item xs={6}>
              <Button  sx = {{color: "black", borderColor: 'black'}} onClick = {showTelegramHandleEdit}> Telegram Handle</Button> 
                {telegramHandleEdit ? 
                <div> 
                {/* <InputLabel htmlFor="user_telegramHandle"> Telegram Handle </InputLabel> */}
                <TextField
                  id="user_telegramHandle"
                  onChange={formik.handleChange}
                  value={formik.values.telegramHandle}
                //   label="@telegramHandle"
                  variant="outlined"
                  name="telegramHandle"
                  required
                  size="medium"
                  sx={{ width: 300 }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.telegramHandle && formik.errors.telegramHandle}
                  helperText={formik.touched.telegramHandle && formik.errors.telegramHandle}
                />
                </div> : <div> </div>}
              </Grid>
            </Grid>
                <Button variant = "contained" type = "submit" sx = {{backgroundColor: "black", marginTop: "5%", color: "white", font: "black", textTransform: "none"}}> Submit Updated Details </Button>

                {click && loading && (
                    <div style = {{fontSize: "20px"}}>
                        Uploading Comment...
                        <CircularProgress color="inherit" />
                    </div>
                )}
            </div>
            </form> 

   

      </Drawer>
        </div>
    )
}





