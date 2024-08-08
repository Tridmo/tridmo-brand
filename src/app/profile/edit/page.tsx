"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notFound, useParams, useRouter } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { selectMyProfile } from '../../../data/me';
import { getProfile } from '../../../data/get_profile';
import OneBrand from '../../../components/screens/brands/one';
import { getOneBrand } from '../../../data/get_one_brand';
import EditBrand from '../../../components/screens/brands/edit';

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}
const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
}
const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)"
}

export default function UserProfile() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status)
  const getBrandStatus = useSelector((state: any) => state?.get_one_brand?.status)
  const dispatch = useDispatch<any>()
  const router = useRouter()
  const profile = useSelector(selectMyProfile)

  React.useEffect(() => {
    if (getProfileStatus === 'idle') {
      dispatch(getProfile())
    }
  }, [isAuthenticated, getProfileStatus])

  React.useEffect(() => {
    if (profile) {
      dispatch(getOneBrand(profile?.brand?.id))
    }
  }, [profile])

  if (getBrandStatus === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <EditBrand />
        </Box>
      </>
    )
  } else if (getBrandStatus === "failed") {
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
