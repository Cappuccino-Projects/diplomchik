import {
	AllPlaces,
	Chat,
	Favourite,
	Login,
	MainMenu,
	Map,
	MapEditMenu,
	Profile,
	Registration,
	Settings,
	Shop,
	DailyTasksPage,
	Inventory
} from '@pages'
import { dailyTaskApi } from '@shared/api/dailyTasks'
import { locationApi } from '@shared/api/location'
import { shopApi } from '@shared/api/shop'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { cityApi, placeTypeApi } from '@shared/api'

import { useDispatch } from 'react-redux'
import { setDailyTasks } from '@redux/slices/dailyTasksSlice'
import { setShop } from '@redux/slices/shopSlice'

const App = () => {
	const dispatch = useDispatch()

	const [places, setPlaces] = useState([])
	const [city, setCities] = useState([])
	const [locations, setLocations] = useState([])

	useEffect(() => {
		placeTypeApi.getAll().then((result) => {
			setPlaces(result.map((t) => ({ ...t, PlaceImage: 'shop.png' })))
		})

		cityApi.getAll().then(setCities)
		locationApi.getAll().then(setLocations)

		shopApi.getAll().then((data) => dispatch(setShop(data)))
		dailyTaskApi.getAll().then((data) => dispatch(setDailyTasks(data)))
	}, [])

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/registration" element={<Registration />} />
					<Route path="/login" element={<Login />} />

					<Route path="/" element={<Map />}>
						<Route
							index
							element={<MainMenu places={places} city={city} />}
						></Route>
						<Route
							path="/mainmenu"
							element={<MainMenu places={places} city={city} />}
						/>
						<Route path="/chat" element={<Chat city={city} />} />
						<Route path="/mapeditmenu" element={<MapEditMenu city={city} />} />
						<Route
							path="/allplaces"
							element={<AllPlaces places={places} city={city} />}
						/>
						<Route
							path="/favourite"
							element={<Favourite locations={locations} city={city} />}
						/>
						<Route
							path="/profile"
							element={<Profile locations={locations} city={city} />}
						/>
						<Route
							path="/profile/settings"
							element={<Settings locations={locations} city={city} />}
						/>
						<Route
							path="/dailytasks"
							element={<DailyTasksPage locations={locations} city={city} />}
						/>
						<Route
							path="/shop"
							element={
								<Shop
									//shopitems={shopItems}
									locations={locations}
									city={city}
								/>
							}
						/>
						<Route
							path="/inventory"
							element={
								<Inventory
								//shopitems={shopItems.filter((e) => e.ItemObtained === true)}
								/>
							}
						/>
						<Route
							path="*"
							element={<MainMenu places={places} city={city} />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
