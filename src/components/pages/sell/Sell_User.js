
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import {Button} from '@mui/material'
import "../../../stylesheets/Cart.css"
import "../../../stylesheets/Sell_User.css"

// this component is for the sell pipeline when the user has logged in 

export default function Sell_User() {
    return (
        <div className='total_movement'>
            <div className = 'bag_icon'> 
                <SentimentVeryDissatisfiedTwoToneIcon sx={{ fontSize: 75}} />
            </div>
            <div className='cart_missing_font' style = {{fontWeight: "bold", fontSize: "45px"}}>
            No Listing Found
            </div>
            <div className = "sell_user_bottom_font">
                <Button variant = "outlined" size='large' sx = {{borderColor: "black", color: "black", fontSize: "20px"}}>
                    Add Listing
                </Button>
            </div>
           
        </div>
    )
}