import type { NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import ToDoGroup from '../components/todoGroup'

const Home: NextPage = () => {
  return (
    <div>


      <main>
        <Box sx={{textAlign:'center'}}>
          <Typography variant="h1">To Do</Typography>
        </Box>

        <ToDoGroup name="Family"/>
        
        
      </main>

      
    </div>
  )
}

export default Home
