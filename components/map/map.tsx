import React, { Fragment, useEffect, useState } from 'react'
import { NextPage } from 'next'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { deleteItem, getLocationItems } from '../../storage/storage'
import { group } from '../../types/group'
import L, { latLng } from "leaflet"
import "leaflet/dist/leaflet.css"
import { mapItem } from '../../types/item'
import { Button, Dialog, DialogContent, Typography } from '@mui/material'
const Map: NextPage = () => {

    const [markers, setMarkers] = useState<Array<mapItem>>([])
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [clickedFt,setClickedFt] =useState<mapItem | null>(null)
    useEffect(() => {
        const marks = getLocationItems()

        setMarkers(marks)


    }, [])
    return (
        <div style={{ width: "95vw", height: "500px" }}>
            <MapContainer style={{ width: "100%", height: "100%" }} center={[-13.92323, 33.7323]} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {
                    markers.map((mapItem, i) => {
                        return (
                            <Fragment key={i}>
                                <Marker position={latLng(mapItem.geometry.coordinates[1], mapItem.geometry.coordinates[0])}
                                    icon={new L.Icon({
                                        iconUrl: 'https://res.cloudinary.com/attic-gis/image/upload/v1638365244/marker_srf8ee.png',
                                        iconSize: new L.Point(30, 45),
                                    })}

                                    eventHandlers={{
                                        click: (e) => {
                                            setClickedFt(mapItem)
                                            setDialogOpen(true)
                                            
                                        }
                                    }}
                                >
                                </Marker>
                            </Fragment>
                        )
                    })

                }

            </MapContainer>
            <Dialog open={dialogOpen} onClose={() => { setDialogOpen(false) }}>
                <DialogContent sx={{display:'flex',flexDirection:'column',gap:4}}>
                    <Typography>
                        {clickedFt?.title}
                    </Typography>
                    <Button variant="outlined" color="error" onClick={() => {
                        setDialogOpen(false)
                        if(clickedFt != null){
                            deleteItem(clickedFt, clickedFt.group, true)
                        }
                        setMarkers(markers.filter(marker => marker.title !== clickedFt?.title))
                    }}>
                        Delete
                    </Button>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Map