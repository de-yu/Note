
export interface UserDetailPayload {
  id: string;
}

export interface UserDetail {
  id: string;
  name: string;
  message: string;
}

export type UserList = Array<{
  id: string;
  name: string;
}>

export interface UserUpdate {
  id: string;
  isSuccess: boolean
}

export interface UserDelete {
  isSuccess: boolean
}

