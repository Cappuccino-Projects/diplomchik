import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const dailyTasksApi = createApi({
	reducerPath: 'dailyTasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${url}/api/mission` }),
	tagTypes: ['DailyTasks'],
	endpoints: (build) => ({
		// Получить все задания
		getAlldailyTasks: build.query({
			query: () => `/`,
			providesTags: ['DailyTasks']
		}),
		// Создать задание
		createDailyTask: build.mutation({
			query: (body) => ({
				url: `/`,
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['DailyTasks']
		}),
		// Изменить задание
		updateDailyTaskById: build.mutation({
			query: ({ id, ...body }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: body
			}),
			invalidatesTags: ['DailyTasks']
		}),
		// Удалить задание
		deleteDailyTaskById: build.mutation({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['DailyTasks']
		})
	})
})

export const {
	useGetAlldailyTasksQuery,
	useCreateDailyTaskMutation,
	useUpdateDailyTaskByIdMutation,
	useDeleteDailyTaskByIdMutation
} = dailyTasksApi
