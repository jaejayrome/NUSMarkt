import SizingGuideCell from "./SizingGuideCell.js"
import {TableRow, TableCell} from '@mui/material';
import { useState } from "react";

export default function SizingGuideRow(props) {

    const [inputMeasurementArr, setInputMeasurementArr] = useState([])

    const arrHandler = (size, inputMeasurement) => {
       const newKVPair = {size: size, inputMeasurement: inputMeasurement}
       const newArr = [...inputMeasurementArr, newKVPair]
       setInputMeasurementArr(newArr)
       props.callback(props.dimension, newArr)
      };
      
    return (
        <TableRow key = {props.dimension}> 
                <TableCell> {props.dimension} </TableCell>
                {props.selectedSizes.map((size) => {
                    return <SizingGuideCell disabled = {props.disabled} dimension = {props.dimension} callback = {arrHandler} size = {size}/>
                })} 
        </TableRow>
    )
}