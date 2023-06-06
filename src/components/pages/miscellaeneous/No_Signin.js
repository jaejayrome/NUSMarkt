// this component would return the button that would lead the user to the sign in button
import { Button } from "@mui/material"
import { Link } from "react-router-dom";

export default function No_Signin (){

    const warning = "You are not logged in right now." 
    const warning2 = "Sign in to continue."
    return (
        <div>
            <div style={{fontSize: "35px",position: "fixed", left: "40%", top: "30%"}}>
                {warning}
            </div>
            <div style={{fontSize: "35px", position: "fixed", left: "40%", top: "40%"}}>
                {warning2}
            </div>

        <Link to = "/SIGNUP" style = {{position: "fixed", left: "40%", top: "50%"}}> 
            <Button size = "large" variant = "text" sx = {{fontSize: "25px" ,color: "black", borderColor: "black"}}> SIGN IN </Button>
        </Link>
        </div>
    )
}