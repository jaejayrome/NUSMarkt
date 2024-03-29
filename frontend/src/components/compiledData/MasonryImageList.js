import {Card, CardContent, Typography, ImageList, ImageListItem, Box, Hidden} from '@mui/material';
import {Link} from 'react-router-dom';
import ImageHandler from '../../config/ImageHandler.js'

export default function MasonryImageList(props) {
// One Issue: need to hard code the filepath in order to download the images
return (
  <Box data-testid={props.datatestid} sx={{ width: 1600, alignItems: 'center', justifyItems: 'center' }}>
    <ImageList cols={3} gap={40}>
      {props.listings.map((listing, index) => (
        <ImageListItem key={listing.id} style={{ width: '400px', height: '410px', marginLeft: '25px' }} data-testid="listing-item"> 
          {listing && listing.listingPrice && listing.listingTitle && listing.filePath && (
            <Link data-testid = "linkToIndiv" to={{ pathname: `/BUY/${listing.id}`, state: { listing } }}>
              <ImageHandler margin="0%" width="100%" height="350px" marginLeft="25px" alt={listing.listingTitle} filePath={listing.filePath} />
            </Link>
          )}
          <CardContent sx={{ overflowY: 'hidden' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '16px' }}>
              {listing.listingTitle ? `${listing.listingTitle}` : 'Title Not Available'}
            </div>
            <div style={{ textAlign: 'right', fontSize: '15px', fontFamily: 'monospace' }}>
              {listing.listingPrice ? ` $${listing.listingPrice}` : ' Price Not Available'}
            </div>
          </CardContent>
        </ImageListItem>
      ))}
    </ImageList>
  </Box>
);
}


