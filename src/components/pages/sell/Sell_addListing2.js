import {useState, useRef} from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL, list} from "firebase/storage";
import { Box, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Navbar from '../../compiledData/Navbar.js';
import { useLocation, useNavigate } from 'react-router-dom';

// Component have to handle the uploading of the image to the datbase 
export default function Sell_addListing2() {

  // retrieving the location object 
  const location = useLocation();
  const navigate = useNavigate();

  const listingTitle = location.state.listingTitle

  const newListing = {
    listingTitle: location.state.listingTitle, 
    listingPrice: location.state.listingPrice, 
    productDescription: location.state.productDescription, 
    sizesAvailable: location.state.selectedSizes, 
    filePath: location.state.listingTitle,
    listedBy: location.state.listedBy
}

  const navigationHandler = () => {
    navigate('/SELL/ADD_LISTING/STEP3', {state: newListing})
}   
  

    // this component handles the image upload
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState("")

    // construct a reference to the file 
    const imageUploadRef = useRef(null)


     // reference to the hidden input element
     const imageRefHandler = () => {
        imageUploadRef.current.click();
    }

    // need to provide a function to upload another image 
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
      
        try {
          // creating a reference to the storage
          const storage = getStorage()

          // creating a filePathReference to the a temporary folder
          const listingImagesRef = ref(storage, `images/temp/${listingTitle}.jpg`);
          const snapshot = await uploadBytes(listingImagesRef, file);
          
          // Get the URL of the uploaded file
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

            <div style = {{display: 'flex', flexDirection: "column", height: "90vh"}}>

              <div style = {{flex: 1, fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                Step 2: Upload Your Image
              </div>

              <div style = {{flex: 20}}>
                <Box  sx = {{display: "flex",
                                    flexDirection: "column", justifyContent: 'center', 
                                    alignItems: 'center',border: '1px dashed black',
                                    backgroundColor: "#E5E4E2", width: "50%", height: "80%" , 
                                    '&:hover': {
                                    backgroundColor: '#D3D3D3',
                                    opacity: [0.9, 0.8, 0.7]},
                                    flex: 1
                        }}>
                            <input
                                accept="image/*"
                                id="upload-image"
                                type="file"
                                ref = {imageUploadRef}
                                style={{ display: 'none' }}
                                onChange={handleImageUpload} />

                            {!selectedImage ? <Button startIcon = {<AddPhotoAlternateOutlinedIcon/>} variant = "outlined" 
                            sx = {{fontWeight: 'bold', borderColor: 'black', color: 'black', 
                                    textTransform: "none", 
                                    '&:hover': {
                                    backgroundColor: '#D3D3D3',
                                    borderColor: 'black'
                                    }}}
                            onClick = {imageRefHandler}> Choose Image </Button> : 
                            <Button startIcon = {<AddPhotoAlternateOutlinedIcon/>} variant = "outlined" 
                            sx = {{fontWeight: 'bold', borderColor: 'black', color: 'black', 
                                    textTransform: "none", 
                                    '&:hover': {
                                    backgroundColor: '#D3D3D3',
                                    borderColor: 'black'
                                    }}}
                            onClick = {imageRefHandler}> Choose Another Image </Button>}

                            {selectedImage ? <img src = {imageURL} alt = "Image Upload Fail" />: "No Image Selected"}
                        </Box>
                </div>

                <div style={{flex: 5}}>
                <Button sx = {{borderColor: 'black', color: 'black'}}variant = "outlined" onClick = {navigationHandler}> Next Step</Button>
                </div>
            </div>

            
        </div>
    )

}