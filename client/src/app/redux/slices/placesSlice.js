import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: []
}

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload
        },
        updatePlace: (state, action) => { // Add a new updatePlace action
            const { id, name, latitude, longitude } = action.payload;
            const placeIndex = state.places.findIndex(place => place.id === id);
            if (placeIndex !== -1) {
                state.places[placeIndex] = { id, name, latitude, longitude };
            }
        },
        addPlace: (state, action) => {
            state.places.push(action.payload);
        }
    }
})

export const { setPlaces, updatePlace, addPlace } = placesSlice.actions // Export the new updatePlace action

export default placesSlice.reducer