import { NextPage } from "next";
import { Box, Typography } from "@mui/material";

interface props {
    title: string,

}

const ToDoItem : NextPage<props> = (props)=>{
    const {title} = props
    return(
        <Box>
            <Typography>{title}</Typography>
        </Box>
    )
}

export default ToDoItem