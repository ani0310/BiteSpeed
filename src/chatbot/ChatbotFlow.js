import { Grid, Stack,TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, useEdgesState, applyNodeChanges, Controls, Background, BackgroundVariant } from 'reactflow';
import { Button , Modal, Box, Typography} from '@mui/material';

import 'reactflow/dist/style.css';
import SettingsPannel from './SettingsPannel';

const initialNodes = [
  // { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  // { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
];

const initialEdges = [
  // { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
];

export default function ChatbotFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [message, setMessage] = useState("");
  const [inputMessage,setInputMessage]=useState("")
  const [idNum,setIdNum]=useState(0);
  const [seletedId,setSelectedId]=useState("")

  const [open, setOpen] = useState(false);

  const getLabel=(id)=>{
    var ans=""
    nodes.map((nod)=>{
      if(nod.id==id) ans= nod?.data?.label
    })
    return ans;
  }

  const handleOpen = () => {
    console.log("handleOpen")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConnect = useCallback(
    (connection) => {
      const sourceHandleId = connection.sourceHandle;
      const sourceNodeId = connection.source;

      // Check if there is already an outgoing edge from the source handle
      const hasOutgoingEdge = edges.some(
        (edge) => edge.source === sourceNodeId && edge.sourceHandle === sourceHandleId
      );

      if (!hasOutgoingEdge) {
        const edge = { ...connection, type: 'custom-edge' };
        console.log(edge, "message3");
        setEdges((eds) => addEdge(edge, eds));
      } else {
        alert('This source handle can only have one outgoing edge.');
      }
    },
    [edges, setEdges],
  );

  const onNodesChange = (changes) => {
    console.log(changes[0], 'message1');
    setMessage(getLabel(changes[0].id));
    setSelectedId(changes[0].id)
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesDelete = (edgesToDelete) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.includes(edge)));
  };

  const addNode = (node) => {
    console.log(node);
    setNodes([...nodes, node]);
  };

  const updateNodes=(node,id)=>{
    const updatedElements = nodes.map(el => {
      if (el.id === id) {
        return {
          ...el,
          
          data: {
            label:node.data.label // You can update the data here
          }
        };
      }
      return el;
    });
    console.log(updatedElements,'message4')
    setNodes(updatedElements)

  }

  return (
    <Stack sx={{ height: '100vh' }}>
       <Grid container  p={1} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }} spacing={2}>
              <Grid item>
                <Button variant="contained"
                 onClick={
                  ()=>{
                  handleOpen()
                }}>Add</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Save</Button>
              </Grid>
            </Grid>
      <Grid sx={{ height: '100%' }} container>
        
        <Grid xs={12} md={8} lg={10} item>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            fitView
          >
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
           
            <Controls />
          </ReactFlow>
        </Grid>
        <Grid xs={12} md={4} lg={2} item>
          <SettingsPannel message={message} onUpdateNodes={updateNodes} seletedId={seletedId} />
        </Grid>
      </Grid>


      <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
         
              <TextField
            size="small"
            id="addMessage"
            label="Add Message"
            variant="outlined"
            fullWidth
            value={inputMessage || ""}
        onChange={(e) => {
          setInputMessage(e?.target?.value);
        }}
      />
     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={()=>{
        const node={ id: (idNum+""), position: { x: 100, y: 100 }, data: { label: inputMessage } }
        setIdNum(prev=>prev+1)
        addNode(node)
      }}  variant="contained" sx={{ ml: 2 }}>Add</Button>
          <Button onClick={handleClose} variant="contained" sx={{ ml: 2 }}>Close Modal</Button>
        </Box>
        </Box>
      </Modal>
      </>
    </Stack>
  );
}
