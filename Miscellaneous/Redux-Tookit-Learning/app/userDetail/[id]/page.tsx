'use client'

import { useGetUserDetailQuery, useGetUserListQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/lib/api/UserApi'
import { useParams  } from 'next/navigation'
import { selectUserDetail, selectUserList } from '@/lib/redux/slices/UserSlice'
import { useSelector } from '@/lib/redux';
import Link from 'next/link';
import { map } from 'lodash';
import { useEffect } from 'react';

export default function userDetail() {

  const searchParams = useParams();
  const userDetail = useSelector(state => selectUserDetail(state, {id: searchParams.id as string}));
  const userList = useSelector(selectUserList)

  useGetUserListQuery()
  const { refetch } = useGetUserDetailQuery({
    id: searchParams.id as string
  });

  const [ updateUser, updateResult] = useUpdateUserMutation()
  const [ deleteUser ] = useDeleteUserMutation()

  useEffect(() => {
    console.log(updateResult)
  }, [updateResult])

  return (
    <div>
      <h1>userDetail</h1>
      <p>
      {
        map(userList, (user) => <Link key={user.id} href={`/userDetail/${user.id}`}> { user.name }</Link>)
      }
      </p>
      <div className="" onClick={() => updateUser({id: userDetail.id})}>
        update
      </div>
      <div className="" onClick={() => deleteUser({id: userDetail.id})}>
        delete
      </div>
      <div className="" onClick={() => refetch()}>
        refetch
      </div>
      <p>
      { userDetail.id }<br />
      { userDetail.name }<br />
      { userDetail.message }<br />
      </p>
    </div>
  )
}
