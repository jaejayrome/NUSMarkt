import SizingGuideCell from "./SizingGuideCell.js"
import {TableRow, TableCell} from '@mui/material';
import { useState } from "react";

export default function SizingGuideRow(props) {

    const [inputMeasurementArr, setInputMeasurementArr] = useState([])

    const arrHandler = (size, inputMeasurement) => {

       const updatedMeasurementArr = [...inputMeasurementArr]
       const existingIndex = updatedMeasurementArr.findIndex((item) => item.size === size)
       
       existingIndex !== -1 ? updatedMeasurementArr[existingIndex] = {size: size, inputMeasurement: inputMeasurement}
        : updatedMeasurementArr.push({size: size, inputMeasurement: inputMeasurement})
       
       setInputMeasurementArr(updatedMeasurementArr)
       props.callback(props.dimension, updatedMeasurementArr)
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