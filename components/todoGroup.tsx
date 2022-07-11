import type { NextPage } from 'next'
import { Box, Typography, Paper, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ToDoItem from './todoItem'
import { useState } from 'react'
import { addItem } from '../storage/storage';

interface props {
    name: string,
    items: Array<string>,
    onItemAdded : ()=>void
}

const ToDoGroup: NextPage<props> = (props) => {
    const { name, items, onItemAdded } = props

    const [dialogOpen,setDialogOpen] = useState(false)
    const [newItemDialog, setNewItemDialog] = useState(false)
    const [item,setItem] = useState<string>("")

    return (
        <Box component={Paper} sx={{ px: 2, py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h3">{name}</Typography>
                <AddIcon onClick={()=>{setNewItemDialog(true)}}/>
            </Box>
            

            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {items.slice(0,3).map((item, i) => {
                    return (
                        <ToDoItem title={item} group={name} key={i} onItemDeleted={onItemAdded} />
                    )
                }
                )}
                <Button sx={{marginTopn:2}} onClick={()=>{setDialogOpen(true)}} variant='outlined'>View All</Button>
            </Box>

            <Dialog open={dialogOpen} onClose={()=>{setDialogOpen(false)}}>
                <DialogTitle sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography variant="h3">{name}</Typography>
                    <CloseIcon onClick={()=>{setDialogOpen(false)}}/>
                </DialogTitle>
                <DialogContent sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {items.map((item, i) => {
                        return (
                            <ToDoItem title={item} group={name} key={i} onItemDeleted={onItemAdded}/>
                        )
                    }
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={newItemDialog} onClose={()=>{setNewItemDialog(false)}}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{`Add new item to ${name}`}</Typography>
                    <CloseIcon onClick={() => { setNewItemDialog(false) }} />
                </DialogTitle>
                <DialogContent sx={{display:'flex',flexDirection:'column',gap:2}}>
                    <TextField sx={{marginTop:2}} variant='outlined' label="Item" onChange={(e)=>{setItem(e.target.value)}}/>
                    <Button variant="contained" onClick={()=>{
                        addItem(item,name)
                        onItemAdded()
                        setNewItemDialog(false)
                    }}>ADD</Button>
                </DialogContent>

            </Dialog>
        </Box>
    )
}

export default ToDoGroup