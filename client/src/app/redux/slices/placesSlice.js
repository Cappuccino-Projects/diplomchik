import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: [],
    selectedMarker: null,
    userSuggestions: [],

}


export const deletePlaceAsync = createAsyncThunk(
  'places/deletePlaceAsync',
  async (_, { dispatch, getState }) => {
    const id = getState().places.selectedMarker.id; // replace this with the actual path to the id in your state

    const response = await fetch(`http://176.123.162.178:9088/api/place/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*'
      }
    });

    if (response.ok) {
      dispatch(placesSlice.actions.removePlace({id}));
    } else {
      console.error('Failed to delete place');
    }
  }
);

export const updatePlaceAsync = createAsyncThunk(
  'places/updatePlace',
  async (place, thunkAPI) => {
    const { id, title, typeId, address, latitude, longitude, photoPath } = place;

    const response = await fetch(`http://176.123.162.178:9088/api/place/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({ title, typeId, address, latitude, longitude, photoPath })
    });

    if (response.ok) {
      const updatedPlace = await response.json();
      thunkAPI.dispatch(placesSlice.actions.updatePlace(updatedPlace));
    } else {
      console.error('Failed to update place');
    }
  }
);




export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload
            
        },
        updatePlace: (state, action) => {
          console.log('Action payload:', action.payload); // Логируем payload действия
      
          const { id, title, typeId, address, latitude, longitude, photoPath } = action.payload;
          console.log('Extracted id from payload:', id); // Логируем id из payload
      
          const placeIndex = state.places.findIndex((place) => place.id === id);
          console.log('Place index found:', placeIndex); // Логируем индекс найденного места
      
          if (placeIndex !== -1) {
              state.places[placeIndex] = { id, title, typeId, address, latitude, longitude, photoPath };
              state.editedPlaces.push(action.payload);
              console.log('Updated place:', state.places[placeIndex]); // Логируем обновленное место
          } else {
              console.warn('Place not found with id:', id); // Логируем предупреждение, если место не найдено
          }
      },

        updateUserSuggestions: (state, action) => {
          const { id, title, typeId, address, latitude, longitude, type, changeType,  } = action.payload
          const placeIndex = state.places.findIndex((place) => place.id === id)
          if (placeIndex !== -1) {
              state.places[placeIndex] = { id, title, typeId, address, latitude, longitude, type, changeType }
              state.userSuggestions.push(action.payload)
            }
        },


        
        addPlace: (state, action) => {
            state.places.push(action.payload)
        },
        addMarker: (state, action) => {
            state.newPlaces.push(action.payload)
        },

        selectMarker: (state, action) => {
            state.selectedMarker = action.payload
            console.log(state.selectedMarker)
        },
        deselectMarker: (state) => {
            state.selectedMarker = null
        },
        

        removeMarker: (state, action) => {
          const id = action.payload;
          if (state.places) {
              const placeToRemove = state.places.find(place => place.id === id);
              if (placeToRemove) {
                  state.places = state.places.filter(place => place.id !== id);
                  if (!state.removedPlaces) {
                      state.removedPlaces = [];
                  }
                  state.removedPlaces.push(placeToRemove);
              }
          }
      },
        
        removePlace: (state, action) => {
            const id = action.payload.id;
            state.places = state.places.filter(place => place.id !== id);
        },
    }
})

export const { setPlaces, updatePlace, addPlace, selectMarker, deselectMarker, updateMarker, addMarker, removeMarker, removePlace, updateUserSuggestions } = placesSlice.actions

export default placesSlice.reducer