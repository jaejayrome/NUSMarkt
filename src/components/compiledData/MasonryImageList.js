import {Card, CardContent, CardMedia, Typography, ImageList, ImageListItem, Box} from '@mui/material';

import {Link} from 'react-router-dom';
import ImageHandler from '../../config/ImageHandler.js'


export default function MasonryImageList(props) {
// One Issue: need to hard code the filepath in order to download the images
  return (
    <Box sx={{ width: 1600, height: 1000, overflowY: 'scroll', alignItems: 'center', justifyItems: 'center'}}>
      <ImageList cols={3} gap={75}>
        {props.listings.map((listing) => (
          <ImageListItem key={listing.id} style = {{width: "400px", height: "400px", marginLeft: "25px"}}>
            {
              <Card sx= {{alignContent: "center", justifyContent: "center", alighItems: "center"}}>
                <Link to={`/LISTING/${listing.id}`}>
                  <ImageHandler alt = {listing.listingTitle} filePath = {listing.filePath}/>
                </Link>

                <CardContent>
                  <Typography variant="body2" color="black">
                    {listing.listingTitle}
                    {listing.listingPrice}
                  </Typography>
                </CardContent>
              </Card>
            }
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

// downloadListingImages(listing.filePath).then((url) => {return url}).catch((error) => {alert(error)})

