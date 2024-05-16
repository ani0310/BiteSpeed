import React, { useEffect, useState } from 'react'

import { TextField,Card ,Button,Grid} from '@mui/material'

const SettingsPannel = ({onUpdateNodes,message,seletedId}) => {
  const [messageValue,setValue]=useState(message);

  const handleClick=()=>{
    if(messageValue==="")return;
    const node={ id: seletedId, position: { x: 0, y: 0 }, data: { label: messageValue } }
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
     
     <Grid container spacing={2}>
  <Grid item xs={12}>
    <TextField
      size="small"
      id="addMessage"
      label="Update Message"
      variant="outlined"
      fullWidth
      value={messageValue || ""}
      onChange={(e) => {
        setValue(e?.target?.value);
      }}
    />
  </Grid>

  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
    <Button 
      variant="outlined" 
      size="small" 
      onClick={handleClick}
    >
      Update
    </Button>
  </Grid>
</Grid>

  

</Card>
  )
}

export default SettingsPannel