import { Box, Button } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

import Navbar from "../../compiledData/Navbar";


export default function Buy_Preorder_Intermediate() {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              border: "2px solid black",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div> <StorefrontRoundedIcon size="large" /></div>
            <div> Pre-Order Marketplace </div>
            <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            Browse through the marketplace to look at pre-order listings from other users!
            </div>
  
            <Link to="/BUY/PREORDER/MARKETPLACE">
              <Button startIcon={<ExitToAppIcon />} sx={{ color: "black", textTransform: "none" }}> Enter </Button>
            </Link>
          </Box>
  
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              border: "2px solid black",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div> <MarkunreadIcon></MarkunreadIcon></div>
            <div> Manage Pre-Order Listings</div>
            <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            View & Manage Your Pre-order Listings   
            </div>
            <Link to="/BUY/PREORDER/LISTINGS">
              <Button startIcon={<ExitToAppIcon />} sx={{ color: "black", textTransform: "none" }}> Enter </Button>
            </Link>
          </Box>
        </div>
  
      </div>
    )
}