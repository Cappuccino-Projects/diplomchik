import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const uploadApi = createApi({
	reducerPath: 'uploadApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/files`
	}),
	tagTypes: ['Image'],
	endpoints: (build) => ({
		getImageByName: build.query({
			query: (name) => `/?fileName=${name}`,
			providesTags: ['Image']
		}),
		uploadImage: build.mutation({
			query: ({image, name}) => ({
				url: `/upload?fileName=${name}`,
				method: 'POST',
				body: image,
			}),
			invalidatesTags: ['Image']
		})
	})
})
export const { useUploadImageMutation, useGetImageByNameQuery } = uploadApi
