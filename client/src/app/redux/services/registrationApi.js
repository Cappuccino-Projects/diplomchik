// api/registrationApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://places.d3s.ru:8080/api' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/registration',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registrationApi;
