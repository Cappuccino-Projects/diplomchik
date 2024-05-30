import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const uploadApi = createApi({
	reducerPath: 'uploadApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/files/upload`
	}),
	tagTypes: ['Image'],
	endpoints: (build) => ({
		uploadImage: build.mutation({
			query: (image) => ({
				url: `/`,
				method: 'POST',
				body: image,
			}),
			invalidatesTags: ['Image']
		})
	})
})
export const { useUploadImageMutation } = uploadApi
