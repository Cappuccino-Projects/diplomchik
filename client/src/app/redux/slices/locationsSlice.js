import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    locations: [],
    selectedMarker: null
}

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocations: (state, action) => {
            state.locations = action.payload
        },
        selectMarker: (state, action) => {
            state.selectedMarker = action.payload
            console.log('selectMarkerSlice', state.selectedMarker)
        },
				updateMarker: (state, action) => {
					const index = state.locations.findIndex(marker => marker.id === action.payload.id);
					if (index !== -1) {
							state.locations[index] = action.payload;

					}
					console.log('updateMarkerSlice', state.locations);
			},
    }
})

export const { setLocations, selectMarker, updateMarker } = locationsSlice.actions

export default locationsSlice.reducer