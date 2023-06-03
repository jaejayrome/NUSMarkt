import "./Navbar.css";
import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import CartIcon from '../mini_components/CartIcon';
import homePageIcon from '../../images/logo.jpg';
import Button from '@mui/material/Button';

function Navbar() {
    const [isClicked, setClick] = useState("BUY");

    const actionArr = [
        {title: 'BUY'},
        {title: 'SELL'},
        {title: 'TRADE'}
    ]
    const clickHandler = () => {
        setClick()
    }

    return (
        <div> 
        <Link to = "/BUY" reloadDocument>
                <img src = {homePageIcon} alt = "NUS MARKT" className= 'logo_button'/>
        </Link>
        
        <CartIcon />

        {actionArr.map((action, index)=> {
        return (
        <NavLink activeClassName = "active" to = {`/ ${action.title}`}>
            <button ifClick = {clickHandler} className = "main_button" key = {index}>
            {action.title}
            </button>
        </NavLink>)})}

        <Link to = "/SIGNUP" className = "sign-up" reloadDocument> 
            <Button variant = "outlined" sx = {{color: "black", borderColor: "black"}}> SIGN IN</Button>
        </Link>
        </div>
    )
}

export default Navbar;
