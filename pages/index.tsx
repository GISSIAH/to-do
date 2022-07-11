import type { NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import ToDoGroup from '../components/todoGroup'

const Home: NextPage = () => {
  return (
    <div>


      <main>
        <Box sx={{textAlign:'center',marginBottom:2}}>
          <Typography variant="h1">To Do</Typography>
        </Box>

        <ToDoGroup name="Family" items={["Buy a car","Move out of crib","Ski with the hommies","Mansplain what slime is"]}/>
        
        
      </main>

      
    </div>
  )
}

export default Home
