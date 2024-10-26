
import userApi from '@/lib/api/UserApi'
import { userSlice } from './slices/UserSlice'

export const reducer = {
  user: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer
}
