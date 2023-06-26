import "./Navbar.css";
import {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import homePageIcon from '../../images/logo.jpg';
import Button from '@mui/material/Button';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase.js"
import {toast} from 'react-toastify';
import {withErrorBoundary} from "../../ErrorBoundary.js"
import { useNavigate } from "react-router-dom";


// pass a state through the link to the sub pages trade and sell
// the state wherein the user has been logged in or not 
// need to account for the difference in the navbar when the user is logged in or logged out 

// added in the functionality where the 
function Navbar(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); 
    const navigate = useNavigate()
    // delays the evaluation by wrapping it around a "supplier"
    const signout =  () => {
        // toast("You have successfully signed out")
        navigate("/SIGNUP")
        auth.signOut()
        
    };
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown); // Toggle the visibility of the dropdown
      };

      const profileClickHandler = () => {
        navigate("/PROFILE")
      }


    

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
        <NavLink key = {index} activeClassName = "active" to = {`/${action.title}`}>
            <button className = "main_button" key = {index}>
            {action.title}
            </button>
        </NavLink>)})}

        {/* <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}> */}
        {isLoggedIn ?  
         <div  className = "sign-up"> 
            <Button onClick = {handleDropdownToggle} sx = {{color: "black"}}> {auth.currentUser.displayName}</Button>
            {showDropdown && (
            <div>
            
            <div className="dropdown-content">
              <Button sx = {{color: "black"}} onClick={signout}>Sign Out</Button>
            </div>

            <div> 
                <Button onClick = {profileClickHandler} sx = {{color: "black"}}> Profile </Button >
            </div> 
        </div>
          )}
            </div> :
            <Link to = "/SIGNUP" className = "sign-upA" reloadDocument> 
            <Button  size = "large" variant = "text" sx = {{color: "black", borderColor: "black"}}> SIGN IN </Button>
            </Link> 
        }
        <Link to = "/BUY/CART" className = "cart">
            <Button size = "large" variant = "text" sx = {{color: "black", borderColor: "black"}}> CART </Button>
        </Link> 
        </div>
    )
}

// const Navbar = withErrorBoundary(Navbar);
export default Navbar;
