import Navbar from "../../../compiledData/Navbar";
import CartItem from "../CartItem.js";
import {auth} from '../../../../config/firebase.js';
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import LockIcon from '@mui/icons-material/Lock';
import { Button, Box, Typography, TextField } from '@mui/material';

export default function Cart() {
    const StyledLockIcon = () => {
        return (
          <Box sx={{borderTop: "2px solid black", pt: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
            <LockIcon sx={{ fontSize: '72px' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Feature Locked
            </Typography>
          </Box>
        );
      };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
          });
    
        return () => unsubscribe();
        }, []);


    return (
        <div>
            <Navbar />
            
            {!isLoggedIn ? 
                <div style = {{fontSize: "20px", textAlign: "center"}}> 
                <StyledLockIcon />
                Sign In To Unlock Feature
                </div> : <CartItem isLogged = {isLoggedIn} uid = {auth.currentUser.uid}/>
            }
        </div>
    )
}