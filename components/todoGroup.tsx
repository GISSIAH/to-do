import type { NextPage } from 'next'
import { Box, Typography, Paper, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ToDoItem from './todoItem'
import { useState } from 'react'

interface props {
    name: string,
    items: Array<string>
}

const ToDoGroup: NextPage<props> = (props) => {
    const { name, items } = props

    const [open,setOpen] = useState(false)
    return (
        <Box component={Paper} sx={{ px: 2, py: 2 }}>
            <Typography variant="h3">{name}</Typography>

            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {items.slice(0,3).map((item, i) => {
                    return (
                        <ToDoItem title={item} key={i} />
                    )
                }
                )}
                <Button sx={{marginTopn:2}} onClick={()=>{setOpen(true)}} variant='outlined'>View All</Button>
            </Box>
            <Dialog open={open} onClose={()=>{setOpen(false)}}>
                <DialogTitle sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography variant="h3">{name}</Typography>
                    <CloseIcon onClick={()=>{setOpen(false)}}/>
                </DialogTitle>
                <DialogContent sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {items.map((item, i) => {
                        return (
                            <ToDoItem title={item} key={i} />
                        )
                    }
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default ToDoGroup