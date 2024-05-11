import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from '../pages/RegistrationPage'
import { cityApi, placeTypeApi } from '../shared/api'
import AllPlases from './../pages/AllPlases'
import Chat from './../pages/Chat'
import DailyTasksPage from './../pages/DailyTasksPage'
import Favourite from './../pages/Favourite'
import LoginPage from './../pages/LoginPage'
import MAP from './../pages/MAP'
import MainMenu from './../pages/MainMenu'
import MapEditMenu from './../pages/MapEditMenu'
import Profile from './../pages/Profile'
import Settings from './../pages/Settings'
import Shop from './../pages/Shop'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			UserCity: '',
			places: [],
			locations: [
				{
					PlaceId: 1,
					PlaceName: 'Пр. Ганненкова Автостроителей и не только 1 А',
					PlaceImage: 'place1.jpg',
					PlaceInfo:
						'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
					PlaceRating: 3
				},
				{
					PlaceId: 2,
					PlaceName: 'Сенная 28',
					PlaceImage: 'place2.jpg',
					PlaceInfo: 'Да, я бы сейчас поел конечно',
					PlaceRating: '5 конечно'
				},
				{
					PlaceId: 3,
					PlaceName: 'Лавки',
					PlaceImage: 'place2.jpg',
					PlaceInfo:
						'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
					PlaceRating: 3
				},
				{
					PlaceId: 4,
					PlaceName: 'Лавки',
					PlaceImage: 'place2.jpg',
					PlaceInfo:
						'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
					PlaceRating: 3
				},
				{
					PlaceId: 5,
					PlaceName: 'Лавки',
					PlaceImage: 'place.jpg',
					PlaceInfo:
						'Очень классное место, куда можно сходить, а можно не ходить. Травка зеленая, но только летом',
					PlaceRating: 3
				}
			],
			dailytasks: [
				{
					TaskId: 1,
					TaskName: 'Зеленая трава',
					TaskImage: 'grass.png',
					TaskBackgroundColor: '#BDFDB2',
					TaskText: 'Пройти 5.000 шагов',
					TaskProgress: '1.341 / 5.000',
					TaskIsCompleted: false
				},
				{
					TaskId: 2,
					TaskName: 'Сюда нам надо',
					TaskImage: 'trophy.png',
					TaskBackgroundColor: '#FFF9B5',
					TaskText: 'Посетить рекомендуемое место',
					TaskProgress: 'Выполнено',
					TaskIsCompleted: true
				},
				{
					TaskId: 3,
					TaskName: 'Ваше мнение важно для нас',
					TaskImage: 'heart.png',
					TaskBackgroundColor: '#FDD4D4',
					TaskText: 'Оставить оценку на карте',
					TaskProgress: 'Выполнено',
					TaskIsCompleted: true
				}
			],
			shopitems: [
				{
					ItemId: 1,
					ItemName: 'Веселье',
					ItemImage: 'frame1.png',
					ItemCategory: 'Avatar Frame',
					ItemBackgroundColor: '#BDFDB2',
					ItemPrice: 5000
				},
				{
					ItemId: 2,
					ItemName: 'Весна',
					ItemImage: 'frame2.png',
					ItemCategory: 'Avatar Frame',
					ItemBackgroundColor: '#B6F8E7',
					ItemPrice: 500
				},
				{
					ItemId: 3,
					ItemName: 'Времена года',
					ItemImage: 'frame2.png',
					ItemCategory: 'Avatar Frame',
					ItemBackgroundColor: '#B6F8E7',
					ItemPrice: 5000
				},
				{
					ItemId: 4,
					ItemName: 'Весна',
					ItemImage: 'frame2.png',
					ItemCategory: 'Avatar Frame',
					ItemBackgroundColor: '#B6F8E7',
					ItemPrice: 500
				},
				{
					ItemId: 5,
					ItemName: 'Времена года',
					ItemImage: 'frame2.png',
					ItemCategory: 'Avatar Frame',
					ItemBackgroundColor: '#B6F8E7',
					ItemPrice: 5000
				},
				{
					ItemId: 11,
					ItemName: 'Темная',
					ItemImage: 'grass.png',
					ItemCategory: 'Theme',
					ItemBackgroundColor: '#212121',
					ItemPrice: 200
				},
				{
					ItemId: 10,
					ItemName: 'Светлая',
					ItemImage: 'trophy.png',
					ItemCategory: 'Theme',
					ItemBackgroundColor: '#F1F1F1',
					ItemPrice: 200
				}
			]
		}
	}

	componentDidMount() {
		placeTypeApi.getAll().then((result) => {
			this.setState({
				places: result.map((t) => ({ ...t, PlaceImage: 'shop.png' }))
			})
		})

		cityApi.getAll().then((result) => {
			this.setState({
				UserCity: result[0].name
			})
		})
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/registration" element={<RegistrationPage />} />
						<Route path="/login" element={<LoginPage />} />

						<Route path="/" element={<MAP />}>
							<Route
								index
								element={
									<MainMenu
										places={this.state.places}
										city={this.state.UserCity}
									/>
								}
							></Route>
							<Route
								path="/mainmenu"
								element={
									<MainMenu
										places={this.state.places}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/chat"
								element={<Chat city={this.state.UserCity} />}
							/>
							<Route
								path="/mapeditmenu"
								element={<MapEditMenu city={this.state.UserCity} />}
							/>
							<Route
								path="/allplaces"
								element={
									<AllPlases
										places={this.state.places}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/favourite"
								element={
									<Favourite
										locations={this.state.locations}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/profile"
								element={
									<Profile
										locations={this.state.locations}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/profile/settings"
								element={
									<Settings
										locations={this.state.locations}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/dailytasks"
								element={
									<DailyTasksPage
										dailytasks={this.state.dailytasks}
										locations={this.state.locations}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="/shop"
								element={
									<Shop
										shopitems={this.state.shopitems}
										locations={this.state.locations}
										city={this.state.UserCity}
									/>
								}
							/>
							<Route
								path="*"
								element={
									<MainMenu
										places={this.state.places}
										city={this.state.UserCity}
									/>
								}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
