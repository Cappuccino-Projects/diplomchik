// @redux/services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://places.d3s.ru:8080/api' }),
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useAuthenticateMutation } = authApi