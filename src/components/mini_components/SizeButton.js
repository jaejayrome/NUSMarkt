import { useState } from "react";
import { ToggleButton } from "@mui/material";

export default function SizeButton(props) {
    // const [selected, setSelected] = useState(props.selected);
    // const [selected, setSelected] = useState(false);

   const handleSizeToggle = () => {
    // setSelected((prevState) => !prevState);
    props.onSizeToggle(props.size);
  };

    return (
      <ToggleButton
        value= {props.size}
        selected={props.isSelected}
        onChange={handleSizeToggle}
        sx={{ marginRight: "5%", height: '50px', width: '50px' }}
      >
        {props.size}
      </ToggleButton>
    );
  
}