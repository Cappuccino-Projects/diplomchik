import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const placeTypeApi = createApi({
	reducerPath: 'placeTypeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/`
	}),
	tagTypes: ['PlaceType', 'Place'],
	endpoints: (build) => ({
		getAllplaceTypes: build.query({
			query: () => `/placeType`,
			providesTags: ['PlaceType']
		}),
		getPlaceTypeById: build.query({
			query: (id) => `/placeType/${id}`,
			providesTags: ['PlaceType']
		}),
		getAllplaces: build.query({
			query: () => `/place`,
			providesTags: ['Place']
		}),
		getPlaceById: build.query({
			query: (id) => `/place/${id}`,
			providesTags: ['Place']
		}),
		addPlace: build.mutation({
			query: (data) => ({
				url: `/place`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Place']
		}),
		updatePlaceById: build.mutation({
			query: ({ id, ...data }) => ({
				url: `/place/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Place']
		})
	})
})

export const {
	useGetPlaceTypeByIdQuery,
	useGetAllplaceTypesQuery,
	useGetAllplacesQuery,
	useGetPlaceByIdQuery,
	useAddPlaceMutation,
	useUpdatePlaceByIdMutation,
	useDeletePlaceByIdMutation
} = placeTypeApi
