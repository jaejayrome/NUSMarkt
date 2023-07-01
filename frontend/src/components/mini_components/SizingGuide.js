import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import SizingGuideRow from './SizingGuideRow.js';
import { useState } from 'react';

export default function SizingGuide(props) {
    const [tableArr, setTableArr] = useState([])

    const tableHandler = (name, inputMeasurementArr) => {

      const updatedArr = [...tableArr]
      const existingIndex = updatedArr.findIndex((obj) => obj.name === name);

      existingIndex !== -1 ? updatedArr[existingIndex] = { name: name, inputMeasurementArr: inputMeasurementArr } : 
        updatedArr.push({ name: name, inputMeasurementArr: inputMeasurementArr })
      
      setTableArr(updatedArr)
      props.callback(updatedArr);
    };
    


    return (
    <div>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell> 
            Dimensions
        </TableCell>
          {props.selectedSizes.map((size) => (
            <TableCell key={size}>{size}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.dimensions.map((dimension) => {
            return <SizingGuideRow disabled = {props.disabled} callback = {tableHandler} selectedSizes = {props.selectedSizes} dimension = {dimension}/>
        })}
      </TableBody>
    </Table>
    </div>
    )
}
