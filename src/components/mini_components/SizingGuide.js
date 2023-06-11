import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';

export default function SizingGuide(props) {


    const preBuiltSizes = ["Chest Width", 'Shoulder Width', "Chest Length"]

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
        {preBuiltSizes.map((dimension) => {
            return <TableRow key = {dimension}> 
                <TableCell> {dimension} </TableCell>
                {props.selectedSizes.map((size) => {
                    return <TableCell key = {size}> {<TextField required/>} </TableCell>
                })} 
            </TableRow>
        })}
      </TableBody>
    </Table>
    </div>
    )
}

