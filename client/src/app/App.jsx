import { Modal } from '@components'
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
	Shop,
	UserSuggestions
} from '@pages'
import { useGetUserByIdQuery } from '@redux/services/userApi'
import { setUser } from '@redux/slices/userSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InfoPDF } from '@pages/InfoPDF'
import { setPlaces } from '@redux/slices/placesSlice'
import { setChanges } from '@redux/slices/changesSlice'

import { placeApi } from '@shared/api'
import { changeApi } from '@shared/api/'
import { Products, Tasks, Users } from '@pages/AdminPanel'

export const App = () => {
	const dispatch = useDispatch()
	const { data: user = {}, isFetchingUser } = useGetUserByIdQuery(1)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const placeData = await placeApi.getAll()
				dispatch(
					setPlaces(placeData.map((t) => ({ ...t, PlaceImage: 'shop.png' })))
				)
			} catch (error) {
				console.error(error)
				// handle error
			}
		}
		fetchData()

		const fetchChanges = async () => {
			try {
				const changeData = await changeApi.getAll()
				dispatch(setChanges(changeData))
			} catch (error) {
				console.error(error)
			}
		}
		fetchChanges()

		if (!isFetchingUser) {
			dispatch(setUser(user))
		}
	}, [user])

	return (
		<>
			<Routes>
				<Route path="/info" element={<InfoPDF />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adminpanel">
					<Route index element={<Navigate to="/adminpanel/products" />} />
					<Route path="products" element={<Products />} />
					<Route path="tasks" element={<Tasks />} />
					<Route path="users" element={<Tasks />} />
				</Route>
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
					<Route path="/usersuggestions" element={<UserSuggestions />} />
					<Route path="/inventory" element={<Inventory />} />
					<Route path="*" element={<MainMenu />} />
				</Route>
			</Routes>
			<Modal />
		</>
	)
}
