import type { NextPage } from 'next'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import { archiveGroup, deleteGroup , pinGroup } from '../../storage/storage';



interface props{
    group: string ;
    setNewItemDialog: React.Dispatch<React.SetStateAction<boolean>> ;
    setLocationDialog: React.Dispatch<React.SetStateAction<boolean>> ;
    setColorPicker: React.Dispatch<React.SetStateAction<boolean>> ;
    cardColor: string ;
    onItemChanged : ()=>void ;
}

const GroupMenu: NextPage<props> = (props) => {
    const {group,cardColor,setNewItemDialog,setLocationDialog,onItemChanged, setColorPicker} = props
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>()
    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton sx={{ color: (cardColor ? 'white' : 'black')}} onClick={(e) => { setAnchorEl(e.currentTarget) }}>
                <MoreVertIcon color={'inherit'}/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                open={open}
                onClose={() => { setAnchorEl(null) }}
                PaperProps={{
                    style: {
                        maxHeight: 'fit-content'
                    },
                }}
            >
                <MenuItem onClick={() => {
                    setAnchorEl(null)
                    setNewItemDialog(true)
                }}>
                    Add Item
                </MenuItem>
                <MenuItem onClick={()=>{setLocationDialog(true)}}>
                    Add Location item
                </MenuItem>
                <MenuItem onClick={() => {
                    pinGroup(group)
                    onItemChanged()
                    setAnchorEl(null)
                }}>
                    Pin Group
                </MenuItem>
                <MenuItem onClick={() => {
                    setColorPicker(true)
                    setAnchorEl(null)
                }}>
                    Set Card Color
                </MenuItem>
                <MenuItem onClick={() => {
                    archiveGroup(group)
                    onItemChanged()
                    setAnchorEl(null)

                }}>
                    Archive Group
                </MenuItem>
                <MenuItem onClick={()=>{
                    deleteGroup(group)
                    onItemChanged()
                    setAnchorEl(null)
                    
                }}>
                    Delete Group
                </MenuItem>
                
            </Menu>
        </div>
    )
}

export default GroupMenu