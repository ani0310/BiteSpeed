import { Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Stack className="text-updater-node"  sx={{minHeight:'50px',minWidth:'200px'}}>
      <Handle type="target" position={Position.Left}  />
      <div>
      <Typography sx={{ color: 'lightgreen', fontSize: 'small' }} variant='body'>Send Message</Typography>

       <Typography>{data?.label}</Typography>
      </div>
      <Handle
        type="source"
        position={Position.Right}
       
      />
      
    </Stack>
  );
}

export default TextUpdaterNode;
