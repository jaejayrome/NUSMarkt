import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../compiledData/Navbar';
import Image from '../../images/coverImage.png';
import goingBackGif from '../../images/showgoingback.gif';
import showBuyGif from '../../images/showBuy.gif';
import showDyna from '../../images/showDyna.gif';
import sendTR from '../../images/sendTradeRequest.gif';
import sendTL from '../../images/sendTL.gif';
import sendImg from '../../images/showimg.gif';
import showTR from '../../images/showTR.gif';
import showMessage from '../../images/showMessage.gif';
import showProfile from '../../images/profile.gif';
import CloseIcon from '@mui/icons-material/Close';

const CarousellPopup = () => {
  const navigate = useNavigate();
  const [items] = useState([
    {
      url: Image,
      isGif: false,
      title: 'Welcome to the tutorial!',
      description: 'We have prepared this tutorial for better user experience! This tutorial doesn\'t cover ALL features',
    },
    {
      url: goingBackGif,
      isGif: true,
      title: 'Navigating Back & Forth',
      description: 'Click any of the buttons on the Navigation Bar to go back!',
    },
    {
      url: showBuyGif,
      isGif: true,
      title: 'BUY: Adding Items to Cart',
      description: "Click on 'Add To Cart' Button and Choose Your Size and Quantity!",
    },
    {
      url: showDyna,
      isGif: true,
      title: 'SELL: Dynamic Sizing Table',
      description: 'Dynamic Sizing Table only shown after you have clicked on any size',
    },
    {
      url: sendImg,
      isGif: true,
      title: 'SELL: Uploading Images',
      description: 'Do note that we currently only support .jpg and .jpeg extensions only',
    },
    {
      url: sendTL,
      isGif: true,
      title: 'TRADE: Sending a Trade Listing',
      description: "Click on 'Send Trade Request Listing' button to begin the process of uploading a listing on the marketplace!",
    },
    {
      url: sendTR,
      isGif: true,
      title: 'TRADE: Sending a Trade Request',
      description: "Click on 'Send Trade Request Button' to send a request for the particular listing you are interested in!",
    },
    {
      url: showTR,
      isGif: true,
      title: 'TRADE: Viewing your Trade Requests',
      description: 'Navigate to the Trade Inbox to view requests. Should you want to trade with them, we have provided their telegram handle for you to liaise with them!',
    },
    {
      url: showMessage,
      isGif: true,
      title: 'REVIEW: Sentiment Analysis Based Review',
      description: 'AI would auto-generate their sentiment analysis on what you feel about the product!',
    },
    {
      url: showProfile,
      isGif: true,
      title: 'PROFILE: View User Credentials',
      description: 'Somehow forgot your name?',
    },
  ]);

  const handleClose = () => {
    navigate('/BUY');
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            p: 2,
            width: '600px',
            height: '600px',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Carousel
            sx={{
              flex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '2%',
            }}
          >
            {items.map((item, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  width: '100%',
                  height: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.isGif ? (
                  <img src={item.url} alt={`GIF ${index}`} style={{ width: '700px', height: '400px' }} />
                ) : (
                  <img src={item.url} alt={`Image ${index}`} style={{ width: '700px', height: '400px' }} />
                )}
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Carousel>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button  sx={{textTransform: "none", color: 'white', backgroundColor: 'black' }} variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CarousellPopup;
