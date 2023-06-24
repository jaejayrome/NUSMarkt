import { useState } from 'react';
import { Drawer, Button, TextField, InputLabel, Box } from '@mui/material';
import {Divider} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { auth } from '../../config/firebase';
import db from '../../config/firebase';
import {addDoc, arrayUnion, collection, updateDoc} from "@firebase/firestore"
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/Upload';

export default function TradeRequestDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M")
  const [title, setTitle] = useState("")
  const [requestDescription, setRequestDescription] = useState("")

  const navigate = useNavigate()

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const clickHandler = (event) => {
    setSelectedSize(event.target.value)
  }

  const titleHandler = (event) => {
    setTitle(event.target.value)
  }

  const requestDescriptionHandler = (event) => {
    setRequestDescription(event.target.value)
  }

  const newRequest = {
    requestTitle: title, 
    requestDescription: requestDescription, 
    offeredSize: selectedSize
  }


  const submitHandler = () => {
    const addRequest = async () => {
      try {
      const collectionRef = collection(db, "tradeRequest")
      const tradeRequestDocument = await addDoc(collectionRef, {...newRequest, madeBy: auth.currentUser.displayName})
    
      await updateDoc(props.originalListingReference, {tradeRequestArr: arrayUnion(tradeRequestDocument)})

      toast("You have successfully sent a trade request!")

      navigate("/TRADE/OUTGOING")
      } catch(error) {
        console.log(error)
      }
    }

    addRequest()
  }

  return (
    <div>
      {props.disabled ? <Button disabled sx = {{right: "-85%", color: "black", borderColor: "black"}}onClick={toggleDrawer}> Send Trade Request </Button>: <Button sx = {{right: "-85%", color: "black", borderColor: "black"}}onClick={toggleDrawer}> Send Trade Request </Button>}
      <Drawer PaperProps={{
            sx: { width: "40%",
            borderRadius: "25px"
           },
           
          }}
      anchor="left" open={isOpen} onClose={toggleDrawer}
      >

      <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontWeight: "bold",marginBottom: "3%", fontSize: "30px", marginTop: "4%"}}> 
        Add Trade Request
      </div>

      <Divider sx = {{border: "1px solid black"}}/>

      <div style = {{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "5%"}}> 
      <InputLabel htmlFor = "title"> Trade Request Title</InputLabel>
      <TextField sx = {{marginBottom: "4%"}}onChange = {titleHandler} id = "title"/>

      <InputLabel htmlFor = "title"> Trade Request Description</InputLabel>
      <TextField onChange = {requestDescriptionHandler}  id = "title"/>

      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" sx = {{marginTop: "5%", color: "black"}}>What size are you offering?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue= "M"
        onChange= {clickHandler}
        sx = {{color: "black"}}
      >

        <FormControlLabel value="XXS" control={<Radio />} label="XXS" />
        <FormControlLabel value="XS" control={<Radio />} label="XS" />
        <FormControlLabel value="S" control={<Radio />} label="S" />
        <FormControlLabel value="M" control={<Radio />} label="M" />
        <FormControlLabel value="L" control={<Radio />} label="L" />
        <FormControlLabel value="XL" control={<Radio />} label="XL" />
        <FormControlLabel value="XXL" control={<Radio />} label="XXL" />
      </RadioGroup>
    </FormControl>

    <Button variant = "outlined" startIcon = {<UploadIcon/>} onClick = {submitHandler} sx = {{borderColor: "black", color: "black", marginTop: "4%"}}> Submit Request </Button>
    </div>

    <Box sx = {{marginTop: "20%", width: "100%", height: "100%", backgroundColor: "black"}}> 

</Box>


   </Drawer>
    </div>
  );
}
