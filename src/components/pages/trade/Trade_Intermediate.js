import { Box, Button } from "@mui/material";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

import Navbar from "../../compiledData/Navbar";

export default function Trade_Intermediate() {
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
          <div> View Outgoing Requests </div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>
            View History of the outgoing requests thus far!
          </div>

          <Link to="/TRADE/OUTGOING">
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
          <div>View Incoming Requests</div>
          <div style={{ marginTop: "5%", fontWeight: "normal", fontSize: "15px" }}>See if you have received any enticing trade offers!</div>
          <Link to="/TRADE/INBOX">
            <Button startIcon={<ExitToAppIcon />} sx={{ color: "black", textTransform: "none" }}> Enter </Button>
          </Link>
        </Box>
      </div>

    </div>
  );
}
