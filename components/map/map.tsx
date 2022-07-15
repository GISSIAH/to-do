import React from 'react'
import { NextPage } from 'next'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from 'react-leaflet'
import { Box } from '@mui/material'
const Map: NextPage = () => {
    return (
        <div style={{width:"95vw",height:"500px"}}>
            <MapContainer style={{ width: "100%", height: "100%" }} center={[-13.92323, 33.7323]} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
    
            </MapContainer>
        </div>
    )
}

export default Map