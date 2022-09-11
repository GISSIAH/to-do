import type { NextPage } from 'next'
import { Box, Typography, Button, Dialog, DialogContent, DialogTitle, TextField, IconButton, Alert, AlertTitle,Tabs,Tab } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ToDoGroup from '../components/todoGroup'
import { getTodo, addGroup } from '../storage/storage'
import { useEffect, useState } from 'react'
import { group } from "../types/group"
import { item } from '../types/item';
import TabPanel from '../components/tab/tab';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("../components/map/map"), { ssr: false })
const Home: NextPage = () => {
  const [groups, setGroups] = useState<Array<group>>([])
  const [newGroupDialog, setNewGroupDialog] = useState(false)
  const [newGroup, setNewGroup] = useState("")
  const [alert,setAlert] = useState(true)
  const [oldestItem,setOldestItem] = useState<item>({title:"",date:new Date()})

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const todo = getTodo()
    setOldestItem(getOldestItem())
    setGroups(todo.groups)

    setTimeout(() => {
      setAlert(false)
    }, 20000)
  }, [])

  const itemAdded = () => {
    const todo = getTodo()
    setGroups(todo.groups)
  }
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {
          (alert && oldestItem.title !== "") ?
            <Alert severity="info" onClose={() => { setAlert(false) }}>
              <AlertTitle>Have you finished</AlertTitle>
              <Typography>{oldestItem.title}</Typography>
            </Alert> : null
        }

        <Box sx={{ textAlign: 'center', marginBottom: 2, }}>
          <Typography variant="h1">To Do</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="List" {...a11yProps(0)} />
              <Tab label="Map" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
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
                    locationItems:[],
                    pinned: false,
                    color:""
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
                    <ToDoGroup cardColor={item.color} locationItemsCount={item.locationItems.length} name={item.name} items={item.items} key={i} onItemChanged={itemAdded} />
                  )
                })
              }
              {
                groups.filter(group => group.pinned !== true).map((item, i) => {
                  return (
                    <ToDoGroup cardColor={item.color} locationItemsCount={item.locationItems.length} name={item.name} items={item.items} key={i} onItemChanged={itemAdded} />
                  )
                })
              }
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Map/>
          </TabPanel>

        </Box>


      </Box>
      
      
    </div>
  )
}
export default Home

function getOldestItem(): item {
  const todo = getTodo()
  var oldestItem: item = { title: "", date: new Date() }
  for (let i = 0; i < todo.groups.length; i++) {

    if (!todo.groups[i].items[0]) {
      if (todo.groups[i].locationItems[0]){
        if (new Date(todo.groups[i].locationItems[0].date).getTime() < new Date(oldestItem.date).getTime()) {
          oldestItem = todo.groups[i].locationItems[0]
        }
      }else{
        continue
      }
      
    }
    else {
      if (new Date(todo.groups[i].items[0].date).getTime() < new Date(oldestItem.date).getTime()) {
        oldestItem = todo.groups[i].items[0]
      }
      
    }
  }
  return oldestItem
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}