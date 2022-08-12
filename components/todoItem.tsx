import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem } from "../storage/storage";
import {item} from "../types/item"
interface props {
    item: item,
    group:string,
    onItemDeleted : ()=>void

}

const ToDoItem : NextPage<props> = (props)=>{
    const {item, group,onItemDeleted} = props
    return(
        <Box sx={{display:'flex',justifyContent:'space-between',px:1}}>
            <Typography>{item.title}</Typography>
            <DeleteIcon onClick={()=>{
                deleteItem(item,group,false)
                onItemDeleted()
                }} color="warning"/>
                
        </Box>
    )
}

export default ToDoItem