import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem } from "../storage/storage";

interface props {
    title: string,
    group:string

}

const ToDoItem : NextPage<props> = (props)=>{
    const {title, group} = props
    return(
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography>{title}</Typography>
            <DeleteIcon onClick={()=>{
                deleteItem(title,group)}} color="warning"/>
        </Box>
    )
}

export default ToDoItem