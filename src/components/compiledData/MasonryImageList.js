import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList(props) {
  const itemData = props.imagesList;


  // thinking of changing the grid to rebass since it allows better flexibility 
  return (
    <Box sx={{ width: 1600, height: 1000, overflowY: 'scroll', alignItems: 'center', justifyItems: 'center'}}>
      <ImageList variant="masonry" cols={3} gap={75}>
        {itemData.map((item) => (
          <ImageListItem key={item.title} style = {{width: "400px", height: "400px", marginLeft: "25px"}}>
            <img
              src={`${item.src}?w=248&fit=crop&auto=format`}
              srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading= "lazy"
            />

          <h6 style = {{color: 'black', fontSize: '20px', fontFamily: 'monospace'}}> Tee Shirt </h6>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

