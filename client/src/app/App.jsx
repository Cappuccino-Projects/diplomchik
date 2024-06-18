import { Modal } from '@components'
import { AllPlaces, Chat, DailyTasksPage, Favourite, Favourite1, Inventory, Login, MainMenu, Map, MapEditMenu, Profile, Registration, Settings, Shop, UserSuggestions } from '@pages'
import { InfoPDF } from '@pages/InfoPDF'
import { setChanges } from '@redux/slices/changesSlice'
import { setPlaces } from '@redux/slices/placesSlice'
import { setUser } from '@redux/slices/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { placeApi } from '@shared/api'
import { changeApi } from '@shared/api/'

import { Places, Products, Reviews, Tasks, Users } from '@pages/AdminPanel'

const AdminRoute = () => {
	return (
		<Routes>
			<Route path="/adminpanel">
				<Route index element={<Navigate to="/adminpanel/products" />} />
				<Route path="products" element={<Products />} />
				<Route path="tasks" element={<Tasks />} />
				<Route path="places" element={<Places />} />
				<Route path="users" element={<Users />} />
				<Route path="reviews" element={<Reviews />} />
			</Route>
		</Routes>
	)
}

const PublicRoute = () => {
	return (
		<Routes>
			<Route path="/info" element={<InfoPDF />} />
		</Routes>
	)
}

const UnAuthenticatedRoute = () => {
	return (
		<Routes>
			<Route path="/registration" element={<Registration />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	)
}

const AuthenticatedRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Map />}>
				<Route index element={<MainMenu />} />
				<Route path="/mainmenu" element={<MainMenu />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/mapeditmenu" element={<MapEditMenu />} />
				<Route path="/allplaces" element={<AllPlaces />} />
				<Route path="/favourite" element={<Favourite />} />
				<Route path="/starred" element={<Favourite1 />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/profile/settings" element={<Settings />} />
				<Route path="/dailytasks" element={<DailyTasksPage />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/usersuggestions" element={<UserSuggestions />} />
				<Route path="/inventory" element={<Inventory />} />
				<Route path="*" element={<MainMenu />} />
			</Route>
		</Routes>
	)
}

export const App = () => {
	const dispatch = useDispatch()
	const userDataStored = useSelector((item) => item.user.user)

	const fetchData = async () => {
		try {
			const placeData = await placeApi.getAll()
			dispatch(setPlaces(placeData.map((t) => ({ ...t, PlaceImage: 'shop.png' }))))
		} catch (error) {
			console.error(error)
			// handle error
		}
	}

	const fetchChanges = async () => {
		try {
			const changeData = await changeApi.getAll()
			dispatch(setChanges(changeData))
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const userData = localStorage.getItem('AllPlacesUserData')

		if (userData !== null) {
			dispatch(setUser(JSON.parse(userData)))
		}
	}, [dispatch])

	useEffect(() => {
		fetchData()
		fetchChanges()
	}, [])

	return (
		<>
			<PublicRoute />
			{userDataStored.id !== undefined ? (
				<>
					<AuthenticatedRoute />
					<AdminRoute />
				</>
			) : (
				<UnAuthenticatedRoute />
			)}
			<Modal />
		</>
	)
}
