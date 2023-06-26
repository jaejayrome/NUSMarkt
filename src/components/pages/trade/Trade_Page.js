import homePageIcon from '../../../images/logo.jpg';
import Navbar from '../../compiledData/Navbar.js';
import No_Signin from '../miscellaeneous/No_Signin';
import { useEffect, useState } from 'react';
import { auth } from "../../../config/firebase.js"
import { onAuthStateChanged } from 'firebase/auth';
import Trade_User from './Trade_User';

function Trade_Page() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
          });
    
        return () => unsubscribe();
        }, []);

    return (
        <div>
            {/* <img src = {homePageIcon} alt = "NUS MARKT" style = {{
                position: "fixed",
                left: "35px",
                top: "-35px",
                maxWidth: "25%",
                maxHeight: "25%",
                cursor: "pointer"
            }}/> */}

            <Navbar> </Navbar>

            {isLoggedIn ? <Trade_User/> : <No_Signin action = "2"/>}
        </div>
    )
}

export default Trade_Page;

