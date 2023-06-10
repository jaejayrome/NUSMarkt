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
