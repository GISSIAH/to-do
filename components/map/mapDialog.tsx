import { Dialog, DialogContent, DialogTitle, TextField, Typography ,IconButton,Button} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import CloseIcon from '@mui/icons-material/Close';
import L, { latLng } from "leaflet"
import "leaflet/dist/leaflet.css"
import { addLocationItem } from "../../storage/storage";

interface props{
    open: boolean,
    group: string,
    onItemAdded: ()=>void,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const MapDialog: NextPage<props> = (props)=>{
    const {open, setOpen,onItemAdded,group} = props
    const [title, setTitle] = useState<string>("")
    const [position, setPosition] = useState<Array<number>>([0,0])
    const MapClick = () => {
        useMapEvents({
            click: (e) => {
                setPosition([e.latlng.lng,e.latlng.lat]);
            },
        });
        return null;
    };
    return (
        <Dialog open={open} onClose={()=>{setOpen(false)}}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Add location task</Typography>
                <IconButton onClick={() => { setOpen(false) }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{display:'flex',flexDirection:'column',gap:4}}>
                <TextField variant="outlined" label="Title" onChange={(e)=>{setTitle(e.target.value)}}/>

                <div style={{ width: "320px", height: "500px" }}>
                    <MapContainer style={{ width: "100%", height: "100%" }} center={[-13.92323, 33.7323]} zoom={11} scrollWheelZoom={true}>
                        <MapClick />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {position ? <Marker position={latLng(position[1], position[0])}
                            icon={new L.Icon({
                                iconUrl: 'https://res.cloudinary.com/attic-gis/image/upload/v1638365244/marker_srf8ee.png',
                                iconSize: new L.Point(30, 45),
                            })}>

                        </Marker> : null}
                        

                    </MapContainer>
                </div>

                <Button variant="contained" color="success" onClick={() => {
                    addLocationItem({
                        title:title,
                        date: new Date(),
                        geometry:{
                            type:"Point",
                            coordinates:position
                        }
                    }, group)
                    onItemAdded()
                    setOpen(false)
                }}>ADD</Button>
            </DialogContent>
        </Dialog>
    )
}

export default MapDialog