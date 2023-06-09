import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import "../../../stylesheets/Cart.css"
import "../../../stylesheets/No_Signin.css"

export default function No_Signin (props){
    const action1 = 'selling'
    const action2 = 'trading'

    return (
        <div className='total_movement'> 
            <div className = 'bag_icon'> 
                <DangerousSharpIcon sx={{ fontSize: 75}}/>
            </div>
            <div className='sell_missing_font' style = {{fontWeight: "bold", fontSize: "45px"}}> 
                No Listing found
            </div> 
            <div className = "sell_bottom_font">
            Sign in to start {props.action == 1 ? action1 : action2}
            </div>
        </div>
    )
}