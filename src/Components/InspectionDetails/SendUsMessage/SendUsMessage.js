import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from "@mui/material/Typography";


 

export const SendUsMessage = () => {
   const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    {open ?
       
    
      <Dialog open onClose={handleClose}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Name"
            type="text"
            
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Email"
            type="email"
            
            variant="standard"
          />
           <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Your message"
      style={{ width: 500 }}
      name="textarea"
    />
        </DialogContent>
        <DialogActions>
          <Button className="" variant="contained" onClick={handleClose}>
          <Typography fontSize={{lg: 14,md: 14,sm: 12,xs: 12,}}>SEND </Typography> </Button>
        </DialogActions>
      </Dialog>
     :""}
   </>
  )
}
