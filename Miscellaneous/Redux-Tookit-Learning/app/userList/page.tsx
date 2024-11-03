'use client'
import React from "react";
import { useGetUserListQuery } from "@/lib/api/UserApi";
import { useSelector } from "@/lib/redux/index";
import Link from 'next/link';
import { selectUserList } from '@/lib/redux/slices/UserSlice';
import { map } from "lodash";

export default function userList() {

  useGetUserListQuery()
  const userList = useSelector(selectUserList)

  return (
    <div>
      <h1>user List</h1>
      <ul>
        {
          map(userList, user => (
            <li key={user.id}>
              <Link href={`/userDetail/${user.id}`}>{user.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
