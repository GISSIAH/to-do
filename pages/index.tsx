import type { NextPage } from 'next'
import { Box, Typography, Button, Dialog, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ToDoGroup from '../components/todoGroup'
import { getTodo, addGroup } from '../storage/storage'
import { useEffect, useState } from 'react'
import { group } from "../types/group"
import { item } from '../types/item';
const Home: NextPage = () => {
  const [groups, setGroups] = useState<Array<group>>([])
  const [newGroupDialog, setNewGroupDialog] = useState(false)
  const [newGroup, setNewGroup] = useState("")
  useEffect(() => {
    const todo = getTodo()
    console.log(getOldestItem())
    setGroups(todo.groups)
  }, [])

  const itemAdded = () => {
    const todo = getTodo()
    setGroups(todo.groups)
  }
  return (
    <div>
      <Box>
        <Box sx={{ textAlign: 'center', marginBottom: 2, }}>
          <Typography variant="h1">To Do</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={{
            xs: "flex-start",
            sm: "flex-start",
            md: "center"
          }}>
          <Button sx={{ marginBottom: 2 }} variant='contained' onClick={() => { setNewGroupDialog(true) }}>New Group</Button>
        </Box>

        <Dialog open={newGroupDialog} onClose={() => { setNewGroupDialog(false) }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Add New Group</Typography>
            <IconButton onClick={() => { setNewGroupDialog(false) }}>
              <CloseIcon />
            </IconButton>
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
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            sm: "column",
            md: "row",
          }}
          flexWrap="wrap"
          justifyContent={{
            xs: "flex-start",
            sm: "flex-start",
            md: "center"
          }}
          gap={{
            xs: 4,
            sm: 4,
            md: 8
          }}
        >
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
      </Box>
    </div>
  )
}
export default Home

function getOldestItem():item{
  const todo = getTodo()
  var oldestItem:item = {title:"",date:new Date()}
  for(let i=0; i< todo.groups.length;i++){
    
  }
  return oldestItem
}
