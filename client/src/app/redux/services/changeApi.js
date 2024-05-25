import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {url} from './currenturl'

export const changeApi = createApi({
  reducerPath: 'changeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/`
  }),
  tagTypes: ['Change'],
  endpoints: (build) => ({
    // Получить все изменения
    getAllChange: build.query({
      query: () => `/change`,
      providesTags: ['Change']
    })
  })
})


export const {useGetAllChangeQuery} = changeApi