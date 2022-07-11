import type { NextPage} from 'next'
import { Box, Typography,Paper } from '@mui/material'
import ToDoItem from './todoItem'

interface props{
    name: string, 
    //items: Array<string> 
}

const ToDoGroup : NextPage<props> = (props)=>{
    const {name} = props
    return (
        <Box component={Paper} sx={{px:2,py:2}}>
            <Typography variant="h3">{name}</Typography>
            
            <Box sx={{marginTop:2, display:'flex',flexDirection:'column',gap:2}}>
                <ToDoItem title="Buy Milk"/>
                <ToDoItem title="Get car from garage"/>
                <ToDoItem title="Buy flowers for garden "/>

            </Box>
        </Box>
    )
}

export default ToDoGroup