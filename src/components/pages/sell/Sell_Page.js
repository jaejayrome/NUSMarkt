import homePageIcon from '../../../images/logo.jpg';
import Navbar from '../../compiledData/Navbar.js';
import No_Signin from '../miscellaeneous/No_Signin.js';
import {auth} from "../../../config/firebase.js";

// the start of the sell pipeline, one would have to change the sell page whenever a user has logged in 
// or use navbar to send back the state up to the parent to be able to view it
function Sell_Page() {
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

            <No_Signin/>

        </div>
    )
}

export default Sell_Page;