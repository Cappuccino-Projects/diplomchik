import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const uploadApi = createApi({
	reducerPath: 'uploadApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api`
	}),
	tagTypes: ['Image'],
	endpoints: (build) => ({
		getImageByName: build.query({
			query: (name) => `/files/?fileName=${name}`,
			providesTags: ['Image']
		}),
		uploadImage: build.mutation({
			query: (image) => ({
				url: `/files/upload`,
				method: 'POST',
				body: image,
			}),
			invalidatesTags: ['Image']
		})
	})
})
export const { useUploadImageMutation, useGetImageByNameQuery } = uploadApi
