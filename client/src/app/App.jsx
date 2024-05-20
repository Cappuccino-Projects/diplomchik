import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
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

import { useDispatch } from 'react-redux';
import { setCities } from '@redux/slices/citiesSlice';
import { setDailyTasks } from '@redux/slices/dailyTasksSlice';
import { setLocations } from '@redux/slices/locationsSlice';
import { setPlaces } from '@redux/slices/placesSlice';
import { setShop } from '@redux/slices/shopSlice';

import { Modal } from '@components'

import { cityApi } from '@shared/api';
import { placeTypeApi } from '@shared/api';
import { placeApi } from '@shared/api';
import { dailyTaskApi } from '@shared/api/dailyTasks';
import { locationApi } from '@shared/api/location';
import { shopApi } from '@shared/api/shop';



export const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const placeData = await placeApi.getAll()
				dispatch(setPlaces(placeData.map((t) => ({ ...t, PlaceImage: 'shop.png' }))))

				const cityData = await cityApi.getAll()
				dispatch(setCities(cityData))

				const locationData = await locationApi.getAll()
				dispatch(setLocations(locationData))

				const shopData = await shopApi.getAll()
				dispatch(setShop(shopData))

				const dailyTaskData = await dailyTaskApi.getAll()
				dispatch(setDailyTasks(dailyTaskData))
			} catch (error) {
				console.error(error)
				// handle error
			}
		}

		fetchData()
	}, [dispatch])

	return (
		<>
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
			<Modal />
		</>
	)
}
