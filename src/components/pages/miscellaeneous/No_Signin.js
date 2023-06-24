import DangerousSharpIcon from '@mui/icons-material/DangerousSharp';
import "../../../stylesheets/Cart.css"
import "../../../stylesheets/No_Signin.css"
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export default function No_Signin (props){
    const action1 = 'selling'
    const action2 = 'trading'

    const StyledLockIcon = () => {
        return (
          <Box sx={{borderTop: "2px solid black", pt: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
            <LockIcon sx={{ fontSize: '72px' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Feature Locked
            </Typography>
          </Box>
        );
      };

    return (
        <div style = {{fontSize: "20px", textAlign: "center"}}> 
                <StyledLockIcon />
                Sign In To Unlock Feature
        </div>


        // <div className='total_movement'> 
        //     <div className = 'bag_icon'> 
        //         <DangerousSharpIcon sx={{ fontSize: 75}}/>
        //     </div>
        //     <div className='sell_missing_font' style = {{fontWeight: "bold", fontSize: "45px"}}> 
        //         No Listing found
        //     </div> 
        //     <div className = "sell_bottom_font">
        //     Sign in to start {props.action == 1 ? action1 : action2}
        //     </div>
        // </div>
    )
}