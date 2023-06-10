import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { useState } from 'react';
import SizeButton from './SizeButton';
import { useState } from 'react';
// exclusive is true when for user buying 
// exclusive is false when for user selling

export default function SizeButtonGroup(props) {

    const handleSizeToggle = (size) => {
        const isSelected = props.selectedSizes.includes(size);
        let updatedSizes = [];

        if (isSelected) {
        // only keeps those that are different from the given size 
        updatedSizes = props.selectedSizes.filter((selectedSize) => selectedSize !== size);
        } else {
        // else this means that the size hasn't been selected before
        updatedSizes = [...props.selectedSizes, size];
        }

        props.onSelectedSizes(updatedSizes);
      };

    const sizeArr = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

    return (
        <div>
            {sizeArr.map((sizing) => (<SizeButton key = {sizing} size = {sizing} onSizeToggle = {handleSizeToggle} isSelected={props.selectedSizes.includes(sizing)}/>))}
        </div>
    )
} 


// const [sizes, setSize] = useState(() => [])

    // const handleSizes = (event, newSizes) => {
    //     setSize(newSizes)
    // }

    // const isSizesSelected = (size) => {sizes.includes(size)}
    
    // return (
    //     <ToggleButtonGroup value = {sizes} onChange = {handleSizes} sx = {{color: 'black'}}>
    //         <ToggleButton value = 'XXS' sx = {{border: '1px solid', color: 'black'}}>
    //         XXS
    //         </ToggleButton>

    //         <ToggleButton value = 'XS'sx = {{border: '1px solid', color: 'black'}}>
    //         XS
    //         </ToggleButton>

    //         <ToggleButton value = 'S'sx = {{border: '1px solid', color: 'black'}}>
    //         S
    //         </ToggleButton>

    //         <ToggleButton value = 'M'sx = {{border: '1px solid', color: 'black'}}>
    //         M
    //         </ToggleButton>

    //         <ToggleButton value = 'L'sx = {{border: '1px solid', color: 'black'}}>
    //         L
    //         </ToggleButton>

    //         <ToggleButton value = 'XL'sx = {{border: '1px solid', color: 'black'}}>
    //         XL
    //         </ToggleButton>

    //         <ToggleButton value = 'XXL'sx = {{border: '1px solid', color: 'black'}}>
    //         XXL
    //         </ToggleButton>


    //     </ToggleButtonGroup>


    // )