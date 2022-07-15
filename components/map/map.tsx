import React, { useEffect,useState } from 'react'
import { NextPage } from 'next'

import { MapContainer, TileLayer,Marker, Popup } from 'react-leaflet'
import { getLocationItems } from '../../storage/storage'
import { group } from '../../types/group'
import L, {latLng} from "leaflet"
import "leaflet/dist/leaflet.css"
import { locationItem } from '../../types/item'
import { Typography } from '@mui/material'
const Map: NextPage = () => {
    
    const [markers,setMarkers] = useState<Array<locationItem>>([])
    useEffect(()=>{
        const  marks = getLocationItems()

        setMarkers(marks)

        
    },[])
    return (
        <div style={{width:"95vw",height:"500px"}}>
            <MapContainer style={{ width: "100%", height: "100%" }} center={[-13.92323, 33.7323]} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                

                {
                    markers.map((locationItem,i)=>{
                        return(
                            <Marker key={i} position={latLng(locationItem.geometry.coordinates[1], locationItem.geometry.coordinates[0])}
                                icon={new L.Icon({
                                    iconUrl: 'https://res.cloudinary.com/attic-gis/image/upload/v1638365244/marker_srf8ee.png',
                                    iconSize: new L.Point(30, 45),
                                })}>
                                <Popup>
                                    <Typography>
                                        {locationItem.title}
                                    </Typography>
                                </Popup>

                            </Marker>
                        )
                    })

                }
                
    
            </MapContainer>
        </div>
    )
}

export default Map