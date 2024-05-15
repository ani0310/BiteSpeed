import React, { useEffect, useState } from 'react'

import { TextField,Card ,Button,Grid} from '@mui/material'

const SettingsPannel = ({onUpdateNodes,message,seletedId}) => {
  const [messageValue,setValue]=useState("");
  console.log(message,messageValue,'message2');
  const handleClick=()=>{
    const node={ id: messageValue, position: { x: 0, y: 0 }, data: { label: messageValue } }
    setValue("")
    onUpdateNodes(node,seletedId)
    
    
  }
  useEffect(()=>{
    if(message){
      setValue(message)
    }
  },[message])


  return (
    <Card sx={{ height: '100%', padding: '10px' }}>
     
  <Grid container  spacing={2} >
  
    <Grid item >
      <TextField
        size="small"
        id="addMessage"
        label="Add Message"
        variant="outlined"
        fullWidth
        value={messageValue || ""}
        onChange={(e) => {
          setValue(e?.target?.value);
        }}
      />
    </Grid>

    <Grid item sx={{display:'flex',alignSelf:'flex-end'}}>
      <Button variant="contained" size="small" onClick={handleClick}>
        Update
      </Button>
    </Grid>
    
  </Grid>
  

</Card>
  )
}

export default SettingsPannel