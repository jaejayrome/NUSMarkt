import { Button, Drawer} from "@mui/material";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'

export default function TradeListingDrawer(props) {

    const [isOpen, setIsOpen] = useState(false);
  

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button sx = {{right: "-85%",color: "black"}} onClick = {toggleDrawer}> View More Details</Button>
            <Drawer PaperProps={{
            sx: { width: "45%" },
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontFamily: "monospace",fontWeight: "bold",marginBottom: "3%", fontSize: "30px"}}> 
            Trade Listing Details
            </div>

            <ListItem alignItems = "flex-start"> 
                Listing Description: 
            </ListItem>

            <Box sx = {{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}> 
                <ListItem sx = {{border: "1px solid black", width: "50%"}}> 
                    {props.listingDescription}
                </ListItem>
            </Box>

            <ListItem alignItems = "flex-start"> 
                Listed By:
                {props.listedBy}
            </ListItem>



            <ListItem alignItems = "flex-start"> 
                Looking For:
            </ListItem>
            {props.selectedSizes}

      </Drawer>
        </div>
    )
}