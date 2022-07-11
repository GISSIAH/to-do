import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem } from "../storage/storage";

interface props {
    title: string,
    group:string,
    onItemDeleted : ()=>void

}

const ToDoItem : NextPage<props> = (props)=>{
    const {title, group,onItemDeleted} = props
    return(
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography>{title}</Typography>
            <DeleteIcon onClick={()=>{
                deleteItem(title,group)
                onItemDeleted()
                }} color="warning"/>
                
        </Box>
    )
}

export default ToDoItem