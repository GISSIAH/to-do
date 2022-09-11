import type { NextPage } from 'next'
import { Box, Typography, Paper, Button, Dialog, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ToDoItem from './todoItem'
import { useState } from 'react'
import { addItem, setGroupColor } from '../storage/storage';
import GroupMenu from './group/groupMenu';
import { item } from '../types/item';
import dynamic from 'next/dynamic';
import { CirclePicker } from "react-color"
const MapDialog = dynamic(() => import("../components/map/mapDialog"), { ssr: false })

interface props {
    name: string,
    items: Array<item>,
    locationItemsCount: number,
    onItemChanged: () => void,
    cardColor: string
}

const ToDoGroup: NextPage<props> = (props: props) => {
    const { name, items, locationItemsCount, onItemChanged, cardColor } = props
    const colors = ["#173753", "#6DAEDB", "#2892D7", "#2E363D", "#95A5B1", "#B0949C", "#946977", "#696994", "#3D155B", "#882ED1", "#264531", "#59A671"]
    const [dialogOpen, setDialogOpen] = useState(false)
    const [newItemDialog, setNewItemDialog] = useState(false)
    const [locationDialog, setLocationDialog] = useState(false)
    const [item, setItem] = useState<string>("")
    const [colorPicker, setColorPicker] = useState(false)
    const [colorSelected, setColorSelected] = useState<string>("")


    return (
        <Box component={Paper} sx={{ px: 2, py: 2, background: cardColor, boxShadow: 24, color: (cardColor ? "white": "black") }}  >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant='caption'>{(items.length + locationItemsCount) + " items"}</Typography>
                </Box>

                <GroupMenu setLocationDialog={setLocationDialog} group={name} setNewItemDialog={setNewItemDialog} onItemChanged={onItemChanged} setColorPicker={setColorPicker} />
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
                        <CloseIcon />
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

            <MapDialog group={name} onItemAdded={onItemChanged} open={locationDialog} setOpen={setLocationDialog} />

            <Dialog open={colorPicker} onClose={() => { setColorPicker(false) }}>
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <CirclePicker colors={colors} onChange={(e: any) => { setColorSelected(e.hex) }} />
                    <Button variant="contained" color="success" onClick={() => {
                        setGroupColor(name, colorSelected)
                        onItemChanged()
                        setColorPicker(false)
                    }}>Save</Button>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default ToDoGroup

