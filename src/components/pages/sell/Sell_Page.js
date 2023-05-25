import homePageIcon from '../../../images/logo.jpg';
import Navbar from '../../compiledData/Navbar.js';

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

        </div>
    )
}

export default Sell_Page;