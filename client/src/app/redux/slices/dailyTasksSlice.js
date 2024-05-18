import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	progressBar: {
		currentlvl: 2,
		value: 33
	},
	dailyTasks: [],
	dailyTasksStatus: '',
	countCompletedTasks: 0,
	isChestAvailable: false
}

export const dailyTasksSlice = createSlice({
	name: 'dailyTasks',
	initialState,
	reducers: {
		setProgressBar: (state, action) => {
			state.progressBar.value = action.payload.value
			state.progressBar.currentlvl = action.payload.currentlvl
		},
		setDailyTasks: (state, action) => {
			// Получение всех заданий
			state.dailyTasks = action.payload
			// Получение кол-ва выполненных
			state.countCompletedTasks = action.payload.filter(
				(task) => task.TaskIsCompleted === true
			).length
			// Получение статуса статуса
			state.dailyTasksStatus =
				state.countCompletedTasks === 3 ? 'Выполнено' : 'В процессе'
			// Получение статуса сундучка
			state.isChestAvailable = state.countCompletedTasks === 3
		},
	}
})

export const { setProgressBar, setDailyTasks } = dailyTasksSlice.actions

export default dailyTasksSlice.reducer
