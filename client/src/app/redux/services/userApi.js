import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './currenturl'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${url}/api/user`
	}),
	tagTypes: ['User', 'Product', 'DailyTasks'],
	endpoints: (build) => ({
		// Получить пользователя по id
		getUserById: build.query({
			query: (userid) => `/${userid}`,
			providesTags: ['User']
		}),
		// Получить всех user`ов
		getAllUsers: build.query({
			query: () => `/`,
			providesTags: ['User']
		}),
		// Изменить данные пользователя по id
		updateUserInfoById: build.mutation({
			query: ({ id, ...user }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: user
			}),
			invalidatesTags: ['User']
		}),
		// Получить все купленные товары пользователя
		getUserProductsById: build.query({
			query: (userid) => `/${userid}/product`,
			providesTags: ['User', 'Product']
		}),
		// Купить товар
		buyProduct: build.mutation({
			query: ({ userId, productId, ...body }) => ({
				url: `/${userId}/product?productId=${productId}`,
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['User', 'Product']
		}),
		// Изменить у купленного товара пользователя
		updateUserProductActiveById: build.mutation({
			query: ({ userId, productId, ...active }) => ({
				url: `/${userId}/product/${productId}`,
				method: 'PUT',
				body: active
			}),
			invalidatesTags: ['User', 'Product']
		}),
		// Удалить купленный товар пользователя
		deleteUserProductById: build.mutation({
			query: ({ userId, productId }) => ({
				url: `/${userId}/product/${productId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User', 'Product']
		}),
		// Получить все задания пользователя
		getUserDailyTasksById: build.query({
			query: (id) => `/${id}/mission`,
			providesTags: ['User', 'DailyTasks']
		}),
		// Изменить задания пользователя
		updateUserDailyTasksById: build.mutation({
			query: ({ userId, missionId, ...body }) => ({
				url: `/${userId}/mission/${missionId}`,
				method: 'PUT',
				body: body
			}),
			invalidatesTags: ['User', 'DailyTasks']
		}),
		// Добавить задание
		addUserDailyTasks: build.mutation({
			query: ({ userId, missionId, ...body }) => ({
				url: `/${userId}/mission?missionId=${missionId}`,
				method: 'POST',
				body: body
			}),
			invalidatesTags: ['User', 'DailyTasks']
		}),
		//Удалить задание
		deleteUserDailyTask: build.mutation({
			query: ({ userId, missionId }) => ({
				url: `/${userId}/mission/${missionId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User', 'DailyTasks']
		}),

		getUserActivateItems: build.query({
			query: (userId) => `/${userId}/appearance`,
			providesTags: ['User', 'Product']
		}),
		// Запрос на изменение выбранных продуктов пользователя
		updateUserActivateItems: build.mutation({
			query: ({ userId, avatar, character }) => ({
				// Строка запроса
				url: `/${userId}/appearance?avatar=${avatar}&character=${character}`,
				// Метод запроса
				method: 'PUT'
			}),
			// Теги запроса
			invalidatesTags: ['User', 'Product']
		}),
		// Запрос на добавление пользователя
		addUser: build.mutation({
			query: (user) => ({
				url: '/',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['User']
		}),
		// Запрос на удаление пользователя
		deleteUserById: build.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User']
		}),
		// Запрос на изменение пользователя
		updateUserById: build.mutation({
			query: ({ id, user }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: user
			}),
			invalidatesTags: ['User']
		})
	})
})

export const {
	useGetUserActivateItemsQuery,
	useUpdateUserActivateItemsMutation,
	useBuyProductMutation,
	useGetUserByIdQuery,
	useUpdateUserInfoByIdMutation,
	useGetUserProductsByIdQuery,
	useUpdateUserProductActiveByIdMutation,
	useDeleteUserProductByIdMutation,
	useGetUserDailyTasksByIdQuery,
	useUpdateUserDailyTasksByIdMutation,
	useDeleteUserDailyTaskMutation,
	useAddUserDailyTasksMutation,
	useAddUserMutation,
	useGetAllUsersQuery,
	useDeleteUserByIdMutation,
	useUpdateUserByIdMutation
} = userApi
