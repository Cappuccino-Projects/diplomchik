import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const changesApi = createApi({
	reducerPath: 'changesApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${url}/api` }),
	tagTypes: ['Change', 'ChangeType'],
	endpoints: (build) => ({
		// Получить все изменения
		getAllChanges: build.query({
			query: () => `/change/`,
			providesTags: ['Change']
		}),
		// Создать изменение
		createChange: build.mutation({
			query: (body) => ({
				url: `/change/`,
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['Change']
		}),
		// Получить все типы изменений
		getAllChangeTypes: build.query({
			query: () => `/changeType/`,
			providesTags: ['ChangeType']
		})
	})
})

export const {
	useGetAllChangesQuery,
	useCreateChangeMutation,
	useGetAllChangeTypesQuery
} = changesApi
