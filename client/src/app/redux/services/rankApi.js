import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const rankApi = createApi({
	reducerPath: 'rankApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/rank`
	}),
	tagTypes: ['Rank'],
	endpoints: (build) => ({
		// Получить ранг по id
		getRankById: build.query({
			query: (id) => `/${id}`,
			providesTags: ['Rank']
		}),
        // Все ранги
		getAllRanks: build.query({
			query: () => `/`,
			providesTags: ['Rank']
		}),

		// Изменить данные пользователя по id
		createRank: build.mutation({
			query: ({ name }) => ({
				url: `/`,
				method: 'POST',
				body: { name }
			}),
			invalidatesTags: ['Rank']
		})
	})
})

export const { useGetRankByIdQuery, useCreateRankMutation, useGetAllRanksQuery } = rankApi
