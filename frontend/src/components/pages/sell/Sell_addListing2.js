import { useState, useRef } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Navbar from '../../compiledData/Navbar.js';
import { useLocation, useNavigate } from 'react-router-dom';
import TransitionModal from '../../mini_components/TransitionModal.js';

export default function Sell_addListing2() {
  const location = useLocation();
  const navigate = useNavigate();
  const listingTitle = location.state.listingTitle;

  const newListing = {
    listingTitle: location.state.listingTitle, 
    listingPrice: location.state.listingPrice, 
    productDescription: location.state.productDescription, 
    sizesAvailable: location.state.sizesAvailable, 
    filePath: location.state.listingTitle,
    listedBy: location.state.listedBy,
    sizingGuide: location.state.sizingGuide
  };

  const navigationHandler = () => {
    navigate('/SELL/ADD_LISTING/STEP3', { state: newListing });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const imageUploadRef = useRef(null);

  const imageRefHandler = () => {
    imageUploadRef.current.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
      
    try {
      const storage = getStorage();
      const listingImagesRef = ref(storage, `images/${listingTitle}.jpg`);
      const snapshot = await uploadBytes(listingImagesRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
        
      setSelectedImage(file);
      setImageURL(downloadURL);
      
      console.log('Selected file:', file);
      console.log('Image URL:', downloadURL);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Navbar />

 
      <div style={{ marginLeft: "3%", fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px" }}> 
        Step 2: Upload Your Image
      </div>

      <div style = {{display: 'flex', justifyContent: "center"}}>

        

      <div style={{ flex: 1.5, textAlign: "center", marginBottom: "1rem", marginTop: "12rem"}}>

      <div style = {{marginBottom: "5%"}}> 
          Only images of <span style={{fontWeight: 'bold'}}> jpg or .jpeg </span>. extensions are allowed!
        </div>
        {!selectedImage ? (
          <Button
            startIcon={<AddPhotoAlternateOutlinedIcon />}
            onClick={imageRefHandler}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              borderColor: "black",
              color: "black",
              textTransform: "none",
              '&:hover': {
                backgroundColor: '#D3D3D3',
                borderColor: 'black'
              },
            }}
          >
            Upload Image
          </Button>
        ) : (
          <Button
            startIcon={<AddPhotoAlternateOutlinedIcon />}
            onClick={imageRefHandler}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              borderColor: "black",
              color: "black",
              textTransform: "none",
              '&:hover': {
                backgroundColor: '#D3D3D3',
                borderColor: 'black'
              },
            }}
          >
            Choose Another Image
          </Button>
        )}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <TransitionModal navigation={navigationHandler} />
        </div>
      </div>

      <div style = {{flex: 2, marginTop: "2rem"}}>
        <Box
          sx={{
            border: "1px dashed black",
            backgroundColor: "#E5E4E2",
            position: "absolute",
            width: '50%',
            height: '65%',
            margin: '0 auto',
            "&:hover": {
              backgroundColor: "#D3D3D3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            ref={imageUploadRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {!selectedImage && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>No Image Found</span>
            </div>
          )}

          {selectedImage && (
            <img
              src={imageURL}
              alt="Image Upload Fail"
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          )}

        </Box>
      </div>

      

      </div>

      
    </div>
  );
}
