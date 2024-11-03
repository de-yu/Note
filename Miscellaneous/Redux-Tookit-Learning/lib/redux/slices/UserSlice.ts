import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit'
import userApi from '@/lib/api/UserApi';
import { ReduxState } from '@/lib/redux/index'
import { UserDetailPayload, UserDetail, UserList } from '@/lib/api/types';

interface UserState {
  list: UserList;
  detail:UserDetail;
}

const initialState: UserState = {
  list: [],
  detail: {
    id: '0',
    name: '',
    message: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export const selectUserList = createSelector([
  (state: ReduxState)  => state.user.list,

  (state: ReduxState) => userApi.endpoints.getUserList.select()(state)?.data],
  (list, apiList) => {
    if( apiList !== undefined) {
      return apiList
    }
    return list
  }
)

export const selectUserDetail = createSelector([
  (state: ReduxState)  => state.user.detail,
  (state, params: UserDetailPayload) => userApi.endpoints.getUserDetail.select(params)(state)?.data,
],
  (state, detail) => {
    if( detail !== undefined) {
      return detail
    }
    return state
  }
)

export const selectUserDetailCopy = createSelector(
  selectUserDetail,
  selectUserDetail => {
    return {
      copyId: '87',
      ...selectUserDetail
    }
  }
)