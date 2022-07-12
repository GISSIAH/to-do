import type { NextPage } from 'next'
import { Box, Typography, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import ToDoGroup from '../components/todoGroup'
import { getTodo, addGroup } from '../storage/storage'
import { useEffect, useState } from 'react'
import { group } from "../types/group"
const Home: NextPage = () => {
  const [groups, setGroups] = useState<Array<group>>([])
  const [newGroupDialog, setNewGroupDialog] = useState(false)
  const [newGroup, setNewGroup] = useState("")
  useEffect(() => {
    const todo = getTodo()

    setGroups(todo.groups)

  }, [])

  const itemAdded = () => {
    const todo = getTodo()
    setGroups(todo.groups)
  }
  return (
    <div>
      <main>
        <Box sx={{ textAlign: 'center', marginBottom: 2, }}>
          <Typography variant="h1">To Do</Typography>
        </Box>
        <Button sx={{ marginBottom: 2 }} variant='contained' onClick={() => { setNewGroupDialog(true) }}>New Group</Button>
        <Dialog open={newGroupDialog} onClose={() => { setNewGroupDialog(false) }}>
          <DialogTitle>
            Add New Group
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField sx={{ marginTop: 2 }} label="Group" variant='outlined' onChange={(e) => { setNewGroup(e.target.value) }} />
            <Button variant="contained" color="success" onClick={() => {
              addGroup({
                name: newGroup,
                items: [],
                pinned: false
              })
              const todo = getTodo()
              setGroups(todo.groups)
              setNewGroupDialog(false)
            }}>Save</Button>
          </DialogContent>
        </Dialog>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {
            groups.filter(group => group.pinned == true).map((item, i) => {
              return (
                <ToDoGroup name={item.name} items={item.items} key={i} onItemChanged={itemAdded} />
              )
            })
          }
          {
            groups.filter(group => group.pinned !== true).map((item, i) => {
              return (
                <ToDoGroup name={item.name} items={item.items} key={i} onItemChanged={itemAdded} />
              )
            })
          }

        </Box>
      </main>
    </div>
  )
}
export default Home
