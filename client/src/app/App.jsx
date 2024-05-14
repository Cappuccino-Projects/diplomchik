import {
	AllPlaces,
	Chat,
	DailyTasksPage,
	Favourite,
	Inventory,
	Login,
	MainMenu,
	Map,
	MapEditMenu,
	Profile,
	Registration,
	Settings,
	Shop
} from '@pages'
import { cityApi, placeTypeApi } from '@shared/api'
import { dailyTaskApi } from '@shared/api/dailyTasks'
import { locationApi } from '@shared/api/location'
import { shopApi } from '@shared/api/shop'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { setCities } from '@redux/slices/citiesSlice'
import { setDailyTasks } from '@redux/slices/dailyTasksSlice'
import { setLocations } from '@redux/slices/locationsSlice'
import { setPlaces } from '@redux/slices/placesSlice'
import { setShop } from '@redux/slices/shopSlice'
import { useDispatch } from 'react-redux'

export const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		placeTypeApi.getAll().then((result) => {
			dispatch(setPlaces(result.map((t) => ({ ...t, PlaceImage: 'shop.png' }))))
		})
		cityApi.getAll().then((data) => dispatch(setCities(data)))
		locationApi.getAll().then((data) => dispatch(setLocations(data)))
		shopApi.getAll().then((data) => dispatch(setShop(data)))
		dailyTaskApi.getAll().then((data) => dispatch(setDailyTasks(data)))
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<Login />} />

				<Route path="/" element={<Map />}>
					<Route index element={<MainMenu />} />
					<Route path="/mainmenu" element={<MainMenu />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/mapeditmenu" element={<MapEditMenu />} />
					<Route path="/allplaces" element={<AllPlaces />} />
					<Route path="/favourite" element={<Favourite />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/settings" element={<Settings />} />
					<Route path="/dailytasks" element={<DailyTasksPage />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/inventory" element={<Inventory />} />
					<Route path="*" element={<MainMenu />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
