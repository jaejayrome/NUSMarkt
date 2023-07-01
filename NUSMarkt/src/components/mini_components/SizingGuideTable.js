import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';


export default function SizingGuide(props) {

    return (
    <div>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell> 
        Dimensions
        </TableCell>

        {/* this should be a table row with the sizes */}
          {props.selectedSizes.map((size) => (
            <TableCell key={size}>{size}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.inputMeasurements.map((dimensionObjArr) => {
            return (<TableRow key = {dimensionObjArr.name}> 
            <TableCell> {dimensionObjArr.name} </TableCell>
            {dimensionObjArr.inputMeasurementArr.map((sizeNmeasurement) => {
              return <TableCell key = {sizeNmeasurement.size}> {sizeNmeasurement.inputMeasurement}</TableCell>
            })}
            </TableRow>)
        })}
      </TableBody>
    </Table>
    </div>
    )
}

