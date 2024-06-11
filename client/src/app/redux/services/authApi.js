// @redux/services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_DOMAIN}/api` }),
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