import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/review`
	}),
	tagTypes: ['Reviews'],
	endpoints: (build) => ({
		getAllreview: build.query({
			query: () => `/`,
			providesTags: ['Reviews']
		}),
		getReviewById: build.query({
			query: (id) => `/${id}`,
			providesTags: ['Reviews']
		}),
		updateReviewById: build.mutation({
			query: ({ id, ...body }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: body
			}),
			invalidatesTags: ['Reviews']
		}),
		deleteReview: build.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Reviews']
		})
	})
})

export const {
	useGetAllreviewQuery,
	useGetReviewByIdQuery,
	useUpdateReviewByIdMutation,
	useDeleteReviewMutation
} = reviewApi
