import { dailyTasksApi } from '@redux/services/dailyTasksApi'
import locationsReducer from '@redux/slices/locationsSlice'
import modalsReducer from '@redux/slices/modalsSlice'
import placesReducer from '@redux/slices/placesSlice'
import changesReducer from '@redux/slices/changesSlice'
import userReducer from '@redux/slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/authApi'
import { userApi } from '@redux/services/userApi'
import { productsApi } from '@redux/services/productsApi'
import { cityApi } from '@redux/services/cityApi'
import { rankApi } from './services/rankApi'
import { registrationApi } from './services/registrationApi'
import { reviewApi } from './services/reviewApi'
import { changeApi } from './services/changeApi'
import { changesApi } from './services/changesApi'
import { placeTypeApi } from './services/placeTypeApi'
import { productTypesApi } from './services/productTypeApi'
import { uploadApi } from './services/uploadApi'
import markerReducer from './slices/markerSlice'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[dailyTasksApi.reducerPath]: dailyTasksApi.reducer,
		[cityApi.reducerPath]: cityApi.reducer,
		[rankApi.reducerPath]: rankApi.reducer,
		[registrationApi.reducerPath]: registrationApi.reducer,
		[reviewApi.reducerPath]: reviewApi.reducer,
		[placeTypeApi.reducerPath]: placeTypeApi.reducer,
		[changeApi.reducerPath]: changeApi.reducer,
		[productTypesApi.reducerPath]: productTypesApi.reducer,
		[changesApi.reducerPath]: changesApi.reducer,
		[uploadApi.reducerPath]: uploadApi.reducer,
		user: userReducer,
		places: placesReducer,
		locations: locationsReducer,
		modals: modalsReducer,
		marker: markerReducer,
		changes: changesReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(productsApi.middleware)
			.concat(dailyTasksApi.middleware)
			.concat(cityApi.middleware)
			.concat(rankApi.middleware)
			.concat(registrationApi.middleware)
			.concat(reviewApi.middleware)
			.concat(placeTypeApi.middleware)
			.concat(changeApi.middleware)
			.concat(productTypesApi.middleware)
			.concat(changesApi.middleware)
			.concat(uploadApi.middleware)
})
setupListeners(store.dispatch)
