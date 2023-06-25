import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import SizeTradeButton from "./SizeTradeButton";

export default function TradeListingDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button sx={{ right: "-85%", color: "black" }} onClick={toggleDrawer}>
        View More Details
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            borderRadius: "25px",
            backgroundColor: 'white',
            width: "25%", 
            justifyContent: 'left', 
            alignItems: "left"
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
      >
<div style={{border: "0.5px solid grey", padding: "3%",  textAlign: "left", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontWeight: "bold", marginBottom: "3%", fontSize: "20px", marginTop: "10%" }}>
  TRADE LISTING DETAILS
</div>

<div style={{  display: "flex", flexDirection: 'column', alignItems: "left", justifyContent: 'left', textAlign: "left", marginLeft: "5%"}}>
  <div style={{ textAlign: "left",fontSize: "20px", fontWeight: "bold" }}>
    Description:
  </div>
  <Box sx={{ textAlign: "left", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "left", marginBottom: "5%" }}>
    {props.listingDescription}
  </Box>
  
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center" }}>
    <SearchIcon />
    <div style={{ fontWeight: 'bold', marginLeft: "5px", marginBottom: "2%" }}>
      Looking for these sizes:
    </div>
  </div>
  <div style={{ display: "flex", marginBottom: "5%" }}>  
    {props.selectedSizes && props.selectedSizes.length !== 0 && props.selectedSizes.map((size) => (
      <SizeTradeButton size={size} />
    ))}
  </div>

  <div style={{ fontWeight: "bold" }}>
    Listed by:
  </div>

  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
    <PermIdentityIcon />{props.listedBy}
  </div>
</div>

      </Drawer>
    </div>
  );
}
