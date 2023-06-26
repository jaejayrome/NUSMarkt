import { useState } from "react";
import { ToggleButton } from "@mui/material";

export default function SizeTradeButton(props) {
    // const [selected, setSelected] = useState(props.selected);
    // const [selected, setSelected] = useState(false);

   const handleSizeToggle = () => {
    
  };


    return (
      <ToggleButton
        value= {props.size}
        selected={props.isSelected}
        onChange={handleSizeToggle}
        sx={{ marginRight: "5%", height: '50px', width: '50px' ,    minWidth: "50px", border:"1px solid black", opacity: 1, 
        minHeight: "50px"}}
      >
        {props.size}
      </ToggleButton>
    );
  
}