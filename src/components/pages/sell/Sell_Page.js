import homePageIcon from '../../../images/logo.jpg';
import Navbar from '../../compiledData/Navbar.js';
import No_Signin from '../miscellaeneous/No_Signin.js';
import {auth} from "../../../config/firebase.js";
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import Sell_User from './Sell_User';

// the start of the sell pipeline, one would have to change the sell page whenever a user has logged in 
// or use navbar to send back the state up to the parent to be able to view it
function Sell_Page() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
          });
    
        return () => unsubscribe();
        }, []);
    
    return (
        <div>
            <img src = {homePageIcon} alt = "NUS MARKT" style = {{
                position: "fixed",
                left: "35px",
                top: "-35px",
                maxWidth: "25%",
                maxHeight: "25%",
                cursor: "pointer"
            }}/>

            <Navbar />

            {isLoggedIn ? <Sell_User/> : <No_Signin action = "1"/>}
        </div>
    )
}

export default Sell_Page;