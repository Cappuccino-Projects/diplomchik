import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/review`
	}),
	tagTypes: ['Review'],
	endpoints: (build) => ({
		getAllreview: build.query({
			query: () => `/`,
			providesTags: ['Review']
		}),
		getReviewById: build.query({
			query: (id) => `/${id}`,
			providesTags: ['Review']
		}),
		updateReviewById: build.mutation({
			query: ({ id, ...body }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: body
			}),
			invalidatesTags: ['Review']
		})
	})
})

export const {
	useGetAllreviewQuery,
	useGetReviewByIdQuery,
	useUpdateReviewByIdMutation
} = reviewApi
