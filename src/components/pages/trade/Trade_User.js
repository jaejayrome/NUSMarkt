import { Box, Button } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

export default function Trade_User() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex" }}>
        <Box
          sx={{
            flexDirection: "column",
            border: "2px solid black",
            textAlign: "center",
            flex: "1",
            fontWeight: "bold",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div> <StorefrontRoundedIcon size = "large"/></div>
          <div>Trade Marketplace</div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            Enter the marketplace where you can view trade requests from other users!
          </div>

          <Link to = "/TRADE/MARKETPLACE"> 
          <Button startIcon = {<ExitToAppIcon/>} sx = {{color: "black",textTransform: "none"}}> Enter </Button>
          </Link>
        </Box>

        <Box
          sx={{
            height: "80vh", 
            flexDirection: "column",
            border: "2px solid black",
            textAlign: "center",
            flex: "1",
            fontWeight: "bold",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div> <ChangeCircleIcon /> </div>
          <div>Trade Listing</div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>View & Add Your Current Trade Listings</div>
          <Link to = "/TRADE/REQUEST">  
          <Button startIcon = {<ExitToAppIcon/>} sx = {{color: "black",textTransform: "none"}}> Enter </Button>
          </Link> 
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            border: "2px solid black",
            textAlign: "center",
            flex: "1",
            fontWeight: "bold",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div> <MarkunreadIcon /></div>
          <div>Trade Inbox</div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>See if you have received any enticing trade offers!</div>
          <Link to = "/TRADE/INTERMEDIATE">   
          <Button startIcon = {<ExitToAppIcon/>} sx = {{color: "black",textTransform: "none"}}> Enter </Button>
          </Link> 
        </Box>
      </div>

      <div></div>
    </div>
  );
}
