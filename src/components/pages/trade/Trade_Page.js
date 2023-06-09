import homePageIcon from '../../../images/logo.jpg';
import Navbar from '../../compiledData/Navbar.js';
import No_Signin from '../miscellaeneous/No_Signin';

function Trade_Page() {
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

            <Navbar> </Navbar>

            <No_Signin action = "2"/>
        </div>
    )
}

export default Trade_Page;

