"use client";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notFound, useParams, useRouter } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { selectMyProfile } from '../../data/me';
import { getProfile } from '../../data/get_profile';
import Cookies from 'js-cookie';
import { getChatToken, selectChatToken } from '../../data/get_chat_token';
import { BgBlur, ContainerStyle, LoaderStyle } from '../../styles/styles';
import dynamic from 'next/dynamic';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

const Chat = dynamic(() => import('../../components/screens/chat'), { ssr: false });

export default function ChatPage() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status)
  const tokenStatus = useSelector((state: any) => state?.get_chat_token?.status)
  const dispatch = useDispatch<any>()
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (getProfileStatus === 'idle') {
      dispatch(getProfile())
    }
  }, [dispatch, isAuthenticated, getProfileStatus])

  React.useEffect(() => {
    if (profile) {
      if (tokenStatus == 'idle') {
        dispatch(getChatToken())
      }
    }
  }, [profile, Cookies, tokenStatus])

  if (getProfileStatus === "succeeded" && tokenStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <Chat />
        </Box>
      </>
    )
  } else if (getProfileStatus === "failed" || getProfileStatus === "failed") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box sx={{ background: "#fafafa", position: "relative" }}>
          <Box sx={BgBlur} />
          <Box>
            <Box sx={ContainerStyle}>
              <CircularProgress sx={LoaderStyle} />
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}
