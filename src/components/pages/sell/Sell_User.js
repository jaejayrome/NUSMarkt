
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import {Button} from '@mui/material'
import "../../../stylesheets/Cart.css"
import "../../../stylesheets/Sell_User.css"
import { Link } from 'react-router-dom';

// this component is for the sell pipeline when the user has logged in 

export default function Sell_User() {
    return (
        <div className='total_movement'>
            <div className = 'bag_icon'> 
                <SentimentVeryDissatisfiedTwoToneIcon sx={{ fontSize: 75}} />
            </div>
            <div style = {{fontWeight: "bold", fontSize: "45px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            No Listing Found
            </div>
            <div className = "sell_user_bottom_font">
                <Link to = "/SELL/ADD_LISTING">
                <Button variant = "outlined" size='large' sx = {{borderColor: "black", color: "black", fontSize: "20px"}}>
                    Add Listing
                </Button>
                </Link>
            </div>
           
        </div>
    )
}