import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${url}/api/product` }),
	tagTypes: ['Product'],
	endpoints: (build) => ({
		// Получить все товары
		getAllProducts: build.query({
			query: () => `/`,
			providesTags: ['Product']
		}),
		// Получить товары по id
		getProductById: build.query({
			query: (id) => `/${id}`,
			providesTags: ['Product']
		}),
		// Добавить товар
		addProduct: build.mutation({
			query: (data) => ({
				url: `/`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Product']
		}),
		updateProductById: build.mutation({
			query: ({ id, ...data }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Product']
		}),
		deleteProductById: build.mutation({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Product']
		})
	})
})

export const {
	useGetAllProductsQuery,
	useAddProductMutation,
	useGetProductByIdQuery,
	useUpdateProductByIdMutation,
	useDeleteProductByIdMutation
} = productsApi
