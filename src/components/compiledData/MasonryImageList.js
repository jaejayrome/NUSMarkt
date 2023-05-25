import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList(props) {
  const itemData = props.imagesList;

  return (
    <Box sx={{ width: 700, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={25}>
        {itemData.map((item) => (
          <ImageListItem key={item.title} style = {{width: "200px", height: "200px"}}>
            <img
              src={`${item.src}?w=248&fit=crop&auto=format`}
              srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading= "lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

