import type { NextPage } from 'next'
import { Box, Typography, Paper, Button, Dialog, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ToDoItem from './todoItem'
import { useState } from 'react'
import { addItem } from '../storage/storage';
import GroupMenu from './group/groupMenu';
import { item } from '../types/item';
import dynamic from 'next/dynamic';

const MapDialog = dynamic(() => import("../components/map/mapDialog"), { ssr: false })

interface props {
    name: string,
    items: Array<item>,
    onItemChanged: () => void
}

const ToDoGroup: NextPage<props> = (props) => {
    const { name, items, onItemChanged } = props

    const [dialogOpen, setDialogOpen] = useState(false)
    const [newItemDialog, setNewItemDialog] = useState(false)
    const [locationDialog,setLocationDialog] = useState(false)
    const [item, setItem] = useState<string>("")


    return (
        <Box component={Paper} sx={{ px: 2, py: 2 }} boxShadow={24}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant='caption'>{items.length + " items"}</Typography>
                </Box>

                <GroupMenu setLocationDialog={setLocationDialog} group={name} setNewItemDialog={setNewItemDialog} onItemChanged={onItemChanged} />
            </Box>


            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {items.slice(0, 3).map((item, i) => {
                    return (
                        <ToDoItem item={item} group={name} key={i} onItemDeleted={onItemChanged} />
                    )
                }
                )}
                {
                    (items.length > 3) ? <Button sx={{ marginTopn: 2 }} onClick={() => { setDialogOpen(true) }} color="secondary">View All</Button> : null
                }

            </Box>

            <Dialog open={dialogOpen} onClose={() => { setDialogOpen(false) }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h3">{name}</Typography>
                    <IconButton onClick={() => { setDialogOpen(false) }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {items.map((item, i) => {
                        return (
                            <ToDoItem item={item} group={name} key={i} onItemDeleted={onItemChanged} />
                        )
                    }
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={newItemDialog} onClose={() => { setNewItemDialog(false) }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{`Add new item to ${name}`}</Typography>
                    <IconButton onClick={() => { setNewItemDialog(false) }}>
                        <CloseIcon  />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField sx={{ marginTop: 2 }} variant='outlined' label="Item" onChange={(e) => { setItem(e.target.value) }} />
                    <Button variant="contained" color="success" onClick={() => {
                        addItem(item, name)
                        onItemChanged()
                        setNewItemDialog(false)
                    }}>ADD</Button>
                </DialogContent>

            </Dialog>

            <MapDialog  group={name} onItemAdded={onItemChanged} open={locationDialog} setOpen={setLocationDialog} />
        </Box>
    )
}

export default ToDoGroup

