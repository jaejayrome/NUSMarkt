import "./Navbar.css";
import {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import homePageIcon from '../../images/logo.jpg';
import Button from '@mui/material/Button';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase.js"


// need to account for the difference in the navbar when the user is logged in or logged out 

// added in the functionality where the 
function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // delays the evaluation by wrapping it around a "supplier"
    const signout = () => {auth.signOut()};

    // don't understand why the useEffect hook would unmount have to unmount 
    // when do we know what we should include at the second argument of the useEffect hook
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(user !== null);
      });

    return () => unsubscribe();
    }, []);

    const actionArr = [
        {title: 'BUY'},
        {title: 'SELL'},
        {title: 'TRADE'}
    ]


    return (
        <div> 
        <Link to = "/BUY" reloadDocument>
                <img src = {homePageIcon} alt = "NUS MARKT" className= 'logo_button'/>
        </Link>
        
        

        {actionArr.map((action, index)=> {
        return (
        <NavLink activeClassName = "active" to = {`/${action.title}`}>
            <button className = "main_button" key = {index}>
            {action.title}
            </button>
        </NavLink>)})}

        {isLoggedIn ? 
            <Link to = "/SIGNUP" className = "sign-up" reloadDocument> 
            <Button onClick =  {signout} size = "large" variant = "text" sx = {{color: "black", borderColor: "black"}}> SIGN OUT </Button>
            </Link> :
            <Link to = "/SIGNUP" className = "sign-up" reloadDocument> 
            <Button  size = "large" variant = "text" sx = {{color: "black", borderColor: "black"}}> SIGN IN </Button>
            </Link> 
        }
        <Link to = "/BUY/CART" className = "cart">
            <Button size = "large" variant = "text" sx = {{color: "black", borderColor: "black"}}> CART </Button>
        </Link> 
        </div>
    )
}

export default Navbar;
