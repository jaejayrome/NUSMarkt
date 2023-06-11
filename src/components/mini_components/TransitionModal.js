import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';

export default function TransitionModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <div>
    <Button onClick={handleOpen} startIcon = {<AddTaskSharpIcon/>} sx = {{borderColor: 'black', color: 'black'}}variant = "outlined" > Next Step</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Before Proceeding
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Ensure that the fields are finalised as no changes can be made. 
            </Typography>

            <Button onClick = {handleClose}> Go Back </Button>
            <Button onClick = {props.navigation}> Continue </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}