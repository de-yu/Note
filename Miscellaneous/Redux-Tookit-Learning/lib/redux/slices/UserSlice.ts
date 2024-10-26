import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit'
import userApi from '@/lib/api/UserApi';
import { ReduxState } from '@/lib/redux/index'
import { UserDetailPayload, UserDetail, UserList } from '@/lib/api/types';

interface UserState {
  list: number[];
}

const initialState: UserState = {
  list: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export const selectUserList = createSelector(
  (state: ReduxState) => userApi.endpoints.getUserList.select()(state)?.data,
  list => {
    const init: UserList = []
    if( list !== undefined) {
      return list
    }
    return init
  }
)

export const selectUserDetail = createSelector([
  (state: ReduxState)  => state,
  (state, id: string) => userApi.endpoints.getUserDetail.select({id})(state)?.data,
],
  (state, detail) => {
    const init: UserDetail = {
      id: '0',
      name: '',
      message: ''
    }
    if( detail !== undefined) {
      return detail
    }
    return init
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