import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const cityApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5143/api/' }),
	endpoints: (builder) => ({
		getCity: builder.query({
			query: () => '/city'
		})
	})
})

export const { useGetCityQuery } = cityApi
export default cityApi.reducer

