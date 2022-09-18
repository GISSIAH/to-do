import { NextPage } from "next";
import { Box, Dialog, Paper, Typography, Button, DialogTitle, IconButton, DialogContent } from "@mui/material"
import { item } from "../types/item"
import ToDoItem from "./todoItem";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { unArchiveGroup } from "../storage/storage";
import UnarchiveIcon from '@mui/icons-material/Unarchive';
interface props {
    name: string,
    items: Array<item>,
    locationItemsCount: number,
    onItemChanged: () => void,

}

const ArchivedGroup: NextPage<props> = (props) => {
    const { name, items, locationItemsCount, onItemChanged } = props
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <Box component={Paper} sx={{ px: 2, py: 2 }}  >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant='caption'>{(items.length + locationItemsCount) + " items"}</Typography>
                </Box>

                <IconButton aria-label="unarchive" onClick={() => {
                    unArchiveGroup(name)
                    onItemChanged()
                }}>
                    <UnarchiveIcon color="primary" />
                </IconButton>
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




        </Box>
    )
}

export default ArchivedGroup