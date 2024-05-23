import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: [],
    selectedMarker: null,
    locations: [],
    markers: []
}

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload
        },
        updatePlace: (state, action) => {
            const { id, name, latitude, longitude } = action.payload
            const placeIndex = state.places.findIndex((place) => place.id === id)
            if (placeIndex !== -1) {
                state.places[placeIndex] = { id, name, latitude, longitude }
            }
        },
        addPlace: (state, action) => {
            state.places.push(action.payload)
        },
        selectMarker: (state, action) => {
            state.selectedMarker = action.payload
        },
        updateMarker: (state, action) => {
            const index = state.locations.findIndex(
                (marker) => marker.id === action.payload.id
            )
            if (index !== -1) {
                state.locations[index] = action.payload
            }
        },
        addMarker: (state, action) => {
            state.markers.push(action.payload)
        }
    }
})

export const { setPlaces, updatePlace, addPlace, selectMarker, updateMarker, addMarker } = placesSlice.actions

export default placesSlice.reducer