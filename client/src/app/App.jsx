import { DailyTasks } from '@components'
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
	Shop
} from '@pages'
import { dailyTaskApi } from '@shared/api/dailyTasks'
import { locationApi } from '@shared/api/location'
import { shopApi } from '@shared/api/shop'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { cityApi, placeTypeApi } from '../shared/api'

const App = () => {
	const [places, setPlaces] = useState([])
	const [city, setCities] = useState([])
	const [locations, setLocations] = useState([])
	const [dailytasks, setDailyTasks] = useState([])
	const [shopItems, setShopItems] = useState([])

	useEffect(() => {
		placeTypeApi.getAll().then((result) => {
			setPlaces(result.map((t) => ({ ...t, PlaceImage: 'shop.png' })))
		})

		cityApi.getAll().then(setCities)
		cityApi.getAll().then(setCities)
		locationApi.getAll().then(setLocations)
		dailyTaskApi.getAll().then(setDailyTasks)
		shopApi.getAll().then(setShopItems)
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
							element={
								<DailyTasks
									dailytasks={dailytasks}
									locations={locations}
									city={city}
								/>
							}
						/>
						<Route
							path="/shop"
							element={
								<Shop shopitems={shopItems} locations={locations} city={city} />
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
