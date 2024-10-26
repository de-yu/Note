
import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'
import { UserDetailPayload, UserDetail, UserList, UserUpdate } from '@/lib/api/types';
import { map } from 'lodash';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // 整支 api 要用的 tagTypes
  tagTypes: ['update', 'delete'],
  endpoints: (builder) => ({
    getUserList: builder.query<UserList, void>({
      query: () => ({
        url: '/userList',
      }),
      // 設定 tag 如果 invalidatesTags 中有包含 就會重新 query
      providesTags: ['update', 'delete'],
      // 轉換輸出 data
      // transformResponse: (response: { data: UserList }, meta, arg) => {
      //   return map(response.data , (data) => {
      //     return {
      //       id: data.id + 2
      //     };
      //   })
      // },
    }),
    getUserDetail: builder.query<UserDetail, UserDetailPayload>({
      query: (data) =>  ({
        url: '/userDetail',
        method: 'POST',
        body: data
      }),
      providesTags: (result, meta, arg) => {

        return [{
          type: 'update',
          id: arg.id
        },
        {
          type: 'delete',
          id: arg.id
        }]
      }

    }),

    updateUser: builder.mutation<UserDetail, UserDetailPayload>({
      query: (data) =>  ({
        url: '/userDetail',
        method: 'PATCH',
        body: data
      }),
      // 設定如果包含以下的 provideTag 就重新 query 
      invalidatesTags:  (result, meta, arg) => {
        return [{
          type: 'update',
          id: arg.id
        },
        {
          type: 'update'
        },]
      }
    }),

    deleteUser: builder.mutation<UserDetail, UserDetailPayload>({
      query: (data) =>  ({
        url: '/userDetail',
        method: 'DELETE',
        body: data
      }),
      invalidatesTags:  (result, meta, arg) => {
        return [{
          type: 'delete',
          id: arg.id
        }]
      }
      
    }),
  }),
})

export default userApi;
export const { useGetUserListQuery, useGetUserDetailQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;