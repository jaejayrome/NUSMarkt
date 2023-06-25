import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Button, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../compiledData/Navbar';

const CarousellPopup = () => {
  const navigate = useNavigate();
  const [items] = useState([

    {
        url: "", 
        isGif: false,
        title: "Thank You For Signing In", 
        description: "We have prepared this tutorial in order to help you to navigate through our website more easily!"
    },
    {
      url: 'https://picsum.photos/200',
      isGif: false,
      title: 'Item 1',
      description: 'Description of Item 1',
    },
    {
      url: 'https://picsum.photos/id/237/200/300',
      isGif: false,
      title: 'BUY',
      description: 'Description of Item 2',
    },
  ]);

  const handleClose = () => {
    navigate('/BUY');
  };

  return (
    <div>
      <Navbar />

      <div className="background">
        <Box
          sx={{
            mt: '5%',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
              border: '2px solid black',
            }}
          >
            {items.map((item, index) => (
              <Card
                key={index}
                sx={{
                  border: '2px solid black',
                  width: '90%',
                  height: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: "5%"
                }}
              >
                {item.isGif ? (
                  <img src={item.url} alt={`GIF ${index}`} style={{ width: '100%', height: 'auto' }} />
                ) : (
                  <img src={item.url} alt={`Image ${index}`} style={{ width: "700px", height: "400px" }} />
                )}
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
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
            <Button sx = {{color: "white", backgroundColor: 'black'}} variant = "contained" onClick={handleClose}> Close </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CarousellPopup;
