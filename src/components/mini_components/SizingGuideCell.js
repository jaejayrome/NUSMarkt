import { TableCell, TextField} from "@mui/material";
import { useState} from "react";

export default function SizingGuideCell (props) {
    const [inputMeasurement, setMeasurement] = useState('')

    const sizeHandler = (event) => {
        const measurement = event.target.value;
        setMeasurement(measurement);
        props.callback(props.size, measurement)
    }


    return (
        <TableCell key = {props.size}> 
            {<TextField disabled = {props.disabled} value = {inputMeasurement} 
            onChange = {sizeHandler} required/>}
        </TableCell>
    )
}