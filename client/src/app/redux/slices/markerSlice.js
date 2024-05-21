
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	markers: []
}



const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    selectMarker: (state, action) => {
      state.selectedMarker = action.payload;
      console.log('selectMarkerSlice', state.selectedMarker);
    },
    updateMarker: (state, action) => {
      const index = state.list.findIndex(marker => marker.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      console.log('updateMarkerSlice', state.list);
    },
    // Other reducers...
  },
});

export const { selectMarker, updateMarker } = markerSlice.actions;

export default markerSlice.reducer;