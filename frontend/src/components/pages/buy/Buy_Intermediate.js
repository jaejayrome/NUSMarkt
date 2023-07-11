import { Box, Button } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

import Navbar from "../../compiledData/Navbar";

export default function Buy_Intermediate() {
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
          <div> Actual Listings </div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            Actual Listings are listings that users on NUSMarkt is able to browse and purchase them
          </div>

          <Link to="/BUY/ACTUAL">
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
          <div> Pre-Order Listings</div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            Pre-Order Listings are listings that are tentative and allows sellers to gain better sense of the demand of a given item</div>
          <Link to="/BUY/PREORDER">
            <Button startIcon={<ExitToAppIcon />} sx={{ color: "black", textTransform: "none" }}> Enter </Button>
          </Link>
        </Box>
      </div>

    </div>
  );
}
