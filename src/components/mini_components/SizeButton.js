import { useState } from "react";
import { ToggleButton } from "@mui/material";

export default function SizeButton(props) {

    const handleSizeToggle = () => {
        props.onSizeToggle(props.size);
      };
  
    return (
      <ToggleButton
        value= {props.size}
        selected={props.selected}
        onChange={handleSizeToggle}
        sx={{ marginRight: "5%", height: '50px', width: '50px' }}
      >
        {props.size}
      </ToggleButton>
    );
  
}