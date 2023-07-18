import Navbar from "../../compiledData/Navbar";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FailedPage() {

    const navigate = useNavigate()

    const StyledIcon = styled(SmsFailedIcon)`
        font-size: 60px;
        
    `

    const reRoute = () => {
         navigate("/BUY/CART")
    }
    return (
        <div> 
            <Navbar />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}> 

                <StyledIcon />
                <div style = {{fontSize: "50px"}}> 
                Payment Unsuccessful!
                </div>

                <div style = {{marginTop: "1%", fontSize: '20px'}}>
                Click <Button onClick = {reRoute} sx = {{textDecoration: "underline", color: 'black', fontSize: "20px"}}> Here </Button>to Try Again!
                </div>
            </div>
        </div>
    )
}