
import "../../../stylesheets/Cart.css"
import "../../../stylesheets/Sell_User.css"
import { Link } from 'react-router-dom';
import { Box, Button } from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SellIcon from '@mui/icons-material/Sell';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


// this component is for the sell pipeline when the user has logged in 

export default function Sell_User() {
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
          <div> <ShowChartIcon size = "large"/></div>
          <div> Pre-Order Grind </div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            Have troubles implementing the design? 
            Use our image generator and upload a pre-order!
          </div>

          <Link to = "/SELL/ANALYTICS"> 
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
          <div> <SellIcon /> </div>
          <div> Your Listings </div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>Add your own configured trade request!</div>
          <Link to = "/SELL/LISTINGS">  
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
          <div> <LibraryAddIcon /></div>
          <div> Add Listing </div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>See if you have received any enticing trade offers!</div>
          <Link to = "/SELL/ADD_LISTING">   
          <Button startIcon = {<ExitToAppIcon/>} sx = {{color: "black",textTransform: "none"}}> Enter </Button>
          </Link> 
        </Box>
      </div>

      <div></div>
    </div>
    )
}