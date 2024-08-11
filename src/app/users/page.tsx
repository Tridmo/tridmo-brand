"use client"

import * as React from 'react';
import NotFoundPage from '@/components/site_info/not_found';
import UsersPage from '../../components/screens/users';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDesigners, selectAllDesigners, selectAllDesignersStatus } from '../../data/get_all_designers';
import { selectMyProfile } from '../../data/me';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Users() {

  const dispatch = useDispatch<any>()

  const profile = useSelector(selectMyProfile)
  const getUsersStatus = useSelector(selectAllDesignersStatus)
  const getUserNameFilter = useSelector((state: any) => state?.handle_filters?.users_name)
  const getUsersOrderBy = useSelector((state: any) => state?.handle_filters?.users_orderby)
  const getUsersOrder = useSelector((state: any) => state?.handle_filters?.users_order)

  React.useEffect(() => {
    if (profile) {
      console.log(getUsersStatus);

      if (getUsersStatus === "idle") {
        dispatch(getAllDesigners({
          brand_id: profile?.brand?.id,
          key: getUserNameFilter,
          orderBy: getUsersOrderBy || 'downloaded_at',
          order: getUsersOrder,
        }))
      }
    }
  }, [
    dispatch,
    profile,
    getUsersStatus,
    getUserNameFilter,
    getUsersOrderBy,
    getUsersOrder,
  ])

  return (
    <>
      <UsersPage />
    </>
  )
}
