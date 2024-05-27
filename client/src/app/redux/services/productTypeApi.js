import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const productTypesApi = createApi({
	reducerPath: 'productTypesApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${url}/api/productType` }),
	tagTypes: ['ProductType'],
	endpoints: (build) => ({
		// Получить все типы товаров
		getAllProductTypes: build.query({
			query: () => `/`,
			providesTags: ['ProductType']
		})
	})
})

export const { useGetAllProductTypesQuery } = productTypesApi

console.log(productTypesApi)
